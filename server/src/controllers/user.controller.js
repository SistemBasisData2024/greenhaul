import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Make sure to set your secret key in .env file

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userQuery = 'SELECT * FROM "user" WHERE email = $1';
    const userResult = await db.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.json({
      userId: user.id,
      jumlah_koin: user.jumlah_koin,
      nama: user.nama,
      alamat: user.alamat,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const userRegister = async (req, res) => {
  try {
    const { email, password, nama, alamat } = req.body;

    // Check for required fields
    if (!email || !password || !nama || !alamat) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password format
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const userCheckQuery = 'SELECT * FROM "user" WHERE email = $1';
    const userCheckResult = await db.query(userCheckQuery, [email]);

    if (userCheckResult.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertUserQuery = `
      INSERT INTO "user" (email, password, nama, alamat)
      VALUES ($1, $2, $3, $4)
      RETURNING id, jumlah_koin, nama, alamat, email
    `;
    const newUser = await db.query(insertUserQuery, [
      email,
      hashedPassword,
      nama,
      alamat,
    ]);

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrderSampah = async (req, res) => {
  try {
    const { id } = req.params;

    const ordersQuery = "SELECT * FROM order_sampah WHERE id_pemesan = $1";
    const ordersResult = await db.query(ordersQuery, [id]);

    res.json(ordersResult.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createOrderSampah = async (req, res) => {
  try {
    const { user_id, tanggal } = req.body;

    const createOrderQuery = `
      INSERT INTO order_sampah (id_pemesan, tanggal)
      VALUES ($1, $2)
      RETURNING *
    `;
    const newOrder = await db.query(createOrderQuery, [user_id, tanggal]);

    res.status(201).json(newOrder.rows[0]);
  } catch (error) {
    console.log("date", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
