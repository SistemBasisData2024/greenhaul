// src/pages/Store.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Store.css'; // We'll create this file for styling

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({ userId: '', productId: '', quantity: 1 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produk');
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = async (productId) => {
    try {
      await axios.post(`http://localhost:5000/produk/${productId}`, {
        user_id: order.userId,
        produk_id: productId,
        jumlah: order.quantity,
      });
      alert('Order placed successfully!');
    } catch (err) {
      setError('Error placing order');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="product-card p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{product.nama}</h2>
            <p className="text-gray-700">{product.gambar}</p>
            <p className="text-blue-600">Price: {product.harga_koin} Coins</p>
            <p className="text-green-600">Stock: {product.stok}</p>
            <input
              type="number"
              value={order.quantity}
              onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
              min="1"
              max={product.stok}
              className="mt-2 p-2 border rounded w-full"
            />
            <button
              onClick={() => handleOrder(product.id)}
              className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
