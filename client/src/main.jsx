// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import LandingPage from "./pages/Landing.jsx";

import UserLogin from "./pages/user/UserLogin.jsx";
import UserRegister from "./pages/user/UserRegister.jsx";
import UserRoute from "./components/UserRoute.jsx";
import Profile from "./pages/user/Profile.jsx";

import Store from "./pages/Store.jsx";
import StoreDetails from "./pages/StoreDetails.jsx";

import Admin from "./pages/admin";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminLogin from "./pages/admin/authentication/Login.jsx";
import AdminRegister from "./pages/admin/authentication/Register.jsx";

import OrderSampah from "./pages/admin/orderSampah/OrderSampah.jsx";
import OrderSampahDetails from "./pages/admin/orderSampah/OrderSampahDetails.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import User from "./pages/user/index.jsx";

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<App />}>
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<StoreDetails />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
      </Route>

      <Route element={<UserRoute />}>
        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route path="login" element={<AdminLogin />} />

        <Route element={<AdminRoute />}>
          <Route path="register" element={<AdminRegister />} />
          <Route path="order-sampah" element={<OrderSampah />} />
          <Route path="order-sampah/:id" element={<OrderSampahDetails />} />
          <Route path="order-produk" element={null} />
          <Route path="order-produk/:id" element={null} />
          <Route path="produk" element={null} />
          <Route path="produk/:id" element={null} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>{router}</React.StrictMode>
);
