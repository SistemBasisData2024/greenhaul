import { db } from "../config/db.js";

/* Get Product List Controller */
export const getProductList = async (req, res) => {
  try {
    const { rows: products } = await db.query("SELECT * FROM produk");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting product list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* Get Product Detail Controller */
export const getProductDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM produk WHERE id = $1", [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error("Error getting product detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* Order Product Controller */
export const orderProduct = async (req, res) => {
  const { id } = req.params;
  const { user_id, jumlah } = req.body;

  try {
    // Check if user has enough coins
    const userResult = await db.query('SELECT * FROM "user" WHERE id = $1', [
      user_id,
    ]);
    const user = userResult.rows[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const produkResult = await db.query("SELECT * FROM produk WHERE id = $1", [
      id,
    ]);
    const produk = produkResult.rows[0];
    if (!produk) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalHarga = produk.harga_koin * jumlah;
    if (user.jumlah_koin < totalHarga) {
      return res.status(400).json({ message: "Insufficient coins" });
    }

    if (produk.stok < jumlah) {
      return res.status(400).json({ message: "Insufficient product stock" });
    }

    const updateProduk = await db.query(
      `
      UPDATE produk
      SET stok = $1
      WHERE id = $2
      RETURNING *
      `,
      [produk.stok - jumlah, produk.id]
    );

    const updateUser = await db.query(
      `
      UPDATE "user"
      SET jumlah_koin = $1
      WHERE id = $2
      RETURNING *
      `,
      [user.jumlah_koin - totalHarga, user.id]
    );

    // Insert order into order_produk table
    const result = await db.query(
      "INSERT INTO order_produk (id_pemesan, id_produk, status, jumlah) VALUES ($1, $2, 'PESANAN DIBELI', $3) RETURNING *",
      [updateUser.rows[0].id, updateProduk.rows[0].id, jumlah]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error in orderProduct:", error);
    res.status(500).json({ error: error.message });
  }
};
