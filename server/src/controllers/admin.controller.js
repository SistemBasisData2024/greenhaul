import { db } from "../config/db.js";
import {
  APIResponse,
  BaseApiResponse,
  createToken,
  hashPassword,
  isValidEmail,
} from "../config/utils.js";

import bcrypt from "bcrypt";

export const isAuthorized = async (req, res, next) => {
  next();
};

/* =============================================
 * =====   AUTHENTICATION CONTROLLERS   ========
 * =============================================
 */

/* Admin Login Controller */
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email))
    return res.status(400).send(BaseApiResponse(null, "Not a valid email!"));

  if (password.length < 8)
    return res
      .status(400)
      .send(BaseApiResponse(null, "Password must have a minimum length of 8!"));

  try {
    const result = await db.query(
      `SELECT * FROM admin 
      WHERE email = $1`,
      [email]
    );

    const data = result.rows[0];

    if (!data)
      return res.status(400).json(BaseApiResponse(null, "Account not found!"));

    const isCorrectPassword = await bcrypt.compare(password, data.password);

    if (!isCorrectPassword)
      return res.status(400).json(BaseApiResponse(null, "Wrong password!"));

    // If login succeed
    const token = createToken(data.id, "admin");

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      secure: !(process.env.NODE_ENV === "development"),
    });

    return res
      .status(202)
      .json({ ...BaseApiResponse(data, "Login Success!"), token });
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};

/* Admin Register Controller */
export const adminRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email))
    return res.status(400).json(BaseApiResponse(null, "Email not valid!"));

  if (password.length < 8)
    return res
      .status(400)
      .json(BaseApiResponse(null, "Password must have a minimum length of 8!"));

  const hashedPassword = await hashPassword(password);

  try {
    const result = await db.query(
      `
    INSERT INTO admin (email, password) VALUES ($1, $2) RETURNING *
    `,
      [email, hashedPassword]
    );

    const data = result.rows[0];

    if (!data)
      return res.status(400).json(BaseApiResponse(null, "Account not found!"));

    if (!hashedPassword)
      return res.status(400).json(BaseApiResponse(null, "Wrong password!"));

    // If login succeed
    const token = createToken(data.id, "admin");

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      secure: !(process.env.NODE_ENV === "development"),
    });

    return res.status(202).json(BaseApiResponse(data, "Register Success!"));
  } catch (error) {
    if (error.code === "23505")
      return res.status(400).json(BaseApiResponse(null, "Email already used!"));

    return res.status(500).json(error);
  }
};

/* Logout Controller */
export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      secure: !(process.env.NODE_ENV === "development"),
    });

    return APIResponse(res, 200, null, "Success logout!");
  } catch (error) {
    return res.status(500).json(error);
  }
};

/* =============================================
 * =======    PRODUCTS CONTROLLERS   ===========
 * =============================================
 */

/* Admin Get All Products Controller */
export const getAllProduk = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM produk`);

    const data = result.rows;

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully get all products"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

/* Admin Create a Product Controller */
export const createProduk = async (req, res) => {
  const { nama, stok, harga_koin, gambar } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO produk (nama, stok, harga_koin, gambar)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [nama, stok, harga_koin, gambar]
    );

    const data = result.rows[0];

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully create a product"));
  } catch (error) {
    if (error.code === "22P02")
      return res
        .status(400)
        .json(BaseApiResponse(null, "Wrong input type!\nPlease check again!"));

    return res.status(500).json(error);
  }
};

/* Admin Get a Specific Product Controller */
export const getProdukById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM produk
      WHERE id = $1`,
      [id]
    );

    const data = result.rows[0];

    if (!data)
      return res.status(404).json(BaseApiResponse(null, "Product not found!"));

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully get a product"));
  } catch (error) {
    if (error.code === "22P02")
      return res
        .status(400)
        .json(BaseApiResponse(null, "ID is not a valid UUID"));

    return res.status(500).json(error);
  }
};

/* Admin Change a Specific Product Controller */
export const changeProdukById = async (req, res) => {
  const { id } = req.params;
  const { nama, gambar, harga_koin, stok } = req.body;

  try {
    const result = await db.query(
      `UPDATE produk
      SET nama       = $2,
          gambar     = $3,
          harga_koin = $4,
          stok       = $5
      WHERE id = $1
      RETURNING *`,
      [id, nama, gambar, harga_koin, stok]
    );

    const data = result.rows[0];

    if (!data)
      return res.status(404).json(BaseApiResponse(null, "Product not found!"));

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully change a product"));
  } catch (error) {
    if (error.code === "22P02")
      return res
        .status(400)
        .json(BaseApiResponse(null, "Wrong input type!\nPlease check again!"));

    return res.status(500).json(error);
  }
};

/* =============================================
 * ======   PRODUCT ORDERS CONTROLLERS   =======
 * =============================================
 */

/* Admin Get All Product Orders Controller */
export const getAllOrderProduk = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM order_produk`);

    const data = result.rows;

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully get all product orders"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

/* Admin Get a Specific Product Controller */
export const getOrderProdukById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM ProdukDetail
      WHERE "ID ORDER" = $1`,
      [id]
    );

    const data = result.rows[0];

    if (!data)
      return res
        .status(404)
        .json(BaseApiResponse(null, "Product Order not found!"));

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully get a product order"));
  } catch (error) {
    if (error.code === "22P02")
      return res
        .status(400)
        .json(BaseApiResponse(null, "ID is not a valid UUID"));

    return res.status(500).json(error);
  }
};

/* Admin Change a Specific Product Controller */
export const changeOrderProdukById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query(
      `UPDATE order_produk
      SET status = $2
      WHERE id = $1
      RETURNING *`,
      [id, status]
    );

    const data = result.rows[0];

    if (!data)
      return res
        .status(404)
        .json(BaseApiResponse(null, "Product order not found!"));

    return res
      .status(200)
      .json(
        BaseApiResponse(data, "Successfully change a product order status")
      );
  } catch (error) {
    if (error.code === "22P02")
      return res
        .status(400)
        .json(BaseApiResponse(null, "Wrong input type!\nPlease check again!"));

    return res.status(500).json(error);
  }
};

/* =============================================
 * ========   WASTE ORDER CONTROLLERS   ========
 * =============================================
 */

/* Admin Get All Waste Orders Controller */
export const getAllOrderSampah = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM order_sampah`);

    const data = result.rows;

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully get all waste orders"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrderSampahById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT * FROM order_sampah INNER JOIN "user" ON order_sampah.id_pemesan = "user".id WHERE order_sampah.id = $1`,
      [id]
    );

    const data = result.rows[0];

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully get waste order details!"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

/* Admin Change Waste Order Controller */
export const changeOrderSampahById = async (req, res) => {
  const { id } = req.params;
  const { status, tanggal, berat } = req.body;

  try {
    const result = await db.query(
      `UPDATE order_sampah
      SET status  = $2
          tanggal = $3
          berat   = $4
      WHERE id = $1
      RETURNING *`,
      [id, status, tanggal, berat]
    );

    const data = result.rows[0];

    if (!data)
      return res
        .status(404)
        .json(BaseApiResponse(null, "Waste order not found!"));

    return res
      .status(200)
      .json(BaseApiResponse(data, "Successfully change a waste order details"));
  } catch (error) {
    if (error.code === "22P02")
      return res
        .status(400)
        .json(BaseApiResponse(null, "Wrong input type!\nPlease check again!"));

    return res.status(500).json(error);
  }
};

/* Admin Convert Waste Order to Coins Controller */
export const konversiSampahToCoin = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM order_sampah
      WHERE id = $1`,
      [id]
    );

    const data = result.rows[0];

    if (!data)
      return res
        .status(404)
        .json(BaseApiResponse(null, "Waste order not found!"));

    const user = await db.query(
      `SELECT * FROM "user"
      WHERE id = $1`,
      [data.id_pemesan]
    );

    if (!!user)
      return res.status(400).json(BaseApiResponse(null, "User not found!"));

    const convertedCoins = Math.round(data.berat * 1000);
    const addedCoins = user.jumlah_koin + convertedCoins;

    const updateUser = db.query(
      `UPDATE "user"
      SET jumlah_koin = $2
      WHERE id = $1
      RETURNING *`,
      [user.id, addedCoins]
    );

    return res
      .status(200)
      .json(
        BaseApiResponse(
          { updated_user: updateUser, coinsAdded: convertedCoins },
          "Successfully convert a waste order to user coins"
        )
      );
  } catch (error) {
    if (error.code === "22P02")
      return res
        .status(400)
        .json(BaseApiResponse(null, "Wrong input type!\nPlease check again!"));

    return res.status(500).json(error);
  }
};
