import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">90sStyle</div>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="/login" className="navbar-link">Login</a>
        <a href="/register" className="navbar-link">Register</a>
      </div>
      <button className="hamburger-menu" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
    </nav>
  );
};

export default Navbar;
