import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIlyMxOK3vmzyiDXUJ5O5JH_9Z96gTLy82xg&s" className='logo-logo' alt="" />
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
