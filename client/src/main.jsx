// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import Store from "./pages/Store.jsx";
import Profile from "./pages/Profile.jsx";
import StoreDetails from "./pages/StoreDetails.jsx";

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="store" element={<Store />} />
        <Route path="store/:id" element={<StoreDetails />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={null} />
      <Route path="/admin" element={null}>
        <Route path="authenticate" element={null} />
        <Route path="order-sampah" element={null} />
        <Route path="order-sampah/:id" element={null} />
        <Route path="order-produk" element={null} />
        <Route path="order-produk/:id" element={null} />
        <Route path="produk" element={null} />
        <Route path="produk/:id" element={null} />
      </Route>
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {router}
  </React.StrictMode>
);
