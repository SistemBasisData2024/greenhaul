import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/greenhaul.png';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="GreenHaul Logo" />
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/store" className="navbar-item">Store</Link>
        <Link to="/login" className="navbar-item">Login</Link>
        <Link to="/contribute" className="navbar-item contribute-button">Contribute Now!</Link>
      </div>
    </nav>
  );
};

export default NavBar;
