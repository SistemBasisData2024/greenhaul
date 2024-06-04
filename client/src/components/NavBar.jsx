import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/greenhaul.png';

const NavBar = () => {
  return (
    <nav className="grid grid-cols-3 items-center p-4 bg-custom-cream font-abril">
      <div className="flex justify-center">
        {/* Empty div to maintain the centering of the logo */}
      </div>
      <div className="flex justify-center">
        <Link to="/">
          <img src={logo} alt="GreenHaul Logo" className="h-16" />
        </Link>
      </div>
      <div className="flex justify-end gap-4">
        <Link to="/store" className="text-custom-green no-underline text-xl hover:bg-custom-green hover:text-custom-cream p-2 rounded">Store</Link>
        <Link to="/login" className="text-custom-green no-underline text-xl hover:bg-custom-green hover:text-custom-cream p-2 rounded">Login</Link>
        <Link to="/register" className="text-custom-cream bg-custom-green no-underline text-xl p-2 rounded hover:bg-custom-cream hover:text-custom-green">Contribute Now!</Link>
      </div>
    </nav>
  );
};

export default NavBar;
