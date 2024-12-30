import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className="logo-horse" src="data:image/png;base64,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" alt="horse" />
      </div>
      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/register" className="navbar-link">
          Register
        </Link>
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </div>
    </nav>
  );
};




export default Navbar;
