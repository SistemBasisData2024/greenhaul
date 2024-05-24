import { db } from "../config/db.js";
import bcrypt from "bcrypt";

/* Get User Profile Controller */
export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM \"user\" WHERE id = $1", [id]);
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
  const { id } = req.params;
  const { nama, alamat, email } = req.body;
  try {
    await db.query(
      "UPDATE \"user\" SET nama = $1, alamat = $2, email = $3 WHERE id = $4",
      [nama, alamat, email, id]
    );
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
    try {
      const { user_id, email, newPassword } = req.body;
  
      // Check if user exists
      const userResult = await db.query("SELECT * FROM \"user\" WHERE id = $1", [user_id]);
      const user = userResult.rows[0];
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if email matches
      if (user.email !== email) {
        return res.status(400).json({ message: "Email does not match" });
      }
  
      // Check if new password is different from old password
      const isPasswordMatch = await bcrypt.compare(newPassword, user.password);
      if (isPasswordMatch) {
        return res.status(400).json({ message: "New password cannot be the same as the old password" });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the password in the database
      const result = await db.query("UPDATE \"user\" SET password = $1 WHERE id = $2 RETURNING *", [hashedPassword, user_id]);
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };