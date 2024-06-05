import { db } from "../config/db.js";
import bcrypt from "bcrypt";

/* Get User Profile Controller */
export const getUserProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM \"user\" WHERE id = $1", [user_id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* Update User Profile Controller */
export const updateUserProfile = async (req, res) => {
  const { user_id } = req.params;
  const { nama, alamat, email } = req.body;
  try {
    // First, check if the user exists
    const checkUser = await db.query("SELECT * FROM \"user\" WHERE id = $1::uuid", [user_id]);
    if (checkUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Then, try to update the user's profile
    const result = await db.query(
      `UPDATE "user" SET 
         "nama" = COALESCE($1, "nama"),
         "alamat" = COALESCE($2, "alamat"),
         "email" = COALESCE($3, "email")
       WHERE id = $4::uuid
       RETURNING *`,
      [nama || null, alamat || null, email || null, user_id]
    );

    if (result.rowCount === 0) {
      // This shouldn't happen since we checked existence, but just in case
      return res.status(500).json({ error: "Failed to update user profile" });
    }

    // Return the updated user profile
    res.status(200).json({
      message: "User profile updated successfully",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const changeUserPassword = async (req, res) => {
  const { user_id } = req.params;
  const { email, currentPassword, newPassword } = req.body;
  try {
    // Check if the user exists and get their current password hash
    const { rows } = await db.query("SELECT email, password FROM \"user\" WHERE id = $1::uuid", [user_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];
    if (user.email !== email) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Compare the provided current password with the stored hash
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password with the new hash
    await db.query("UPDATE \"user\" SET password = $1 WHERE id = $2::uuid", [hashedPassword, user_id]);
    res.status(200).json({ message: "User password changed successfully" });
  } catch (error) {
    console.error("Error changing user password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};