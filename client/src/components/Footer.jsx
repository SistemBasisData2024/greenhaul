import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-custom-cream text-custom-green font-abril text-center p-4">
      <div className="container mx-auto">
        <p>© 2024 GreenHaul. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/privacy" className="no-underline hover:underline">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link to="/terms" className="no-underline hover:underline">Terms of Service</Link>
          <span className="mx-2">|</span>
          <Link to="/contact" className="no-underline hover:underline">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
