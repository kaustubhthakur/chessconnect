import React, { useState } from 'react';
import './Navbar.css';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const user = useRecoilValue(userAtom)
const handleLogout = () => {
  localStorage.removeItem("user-threads");
  window.location.reload(); // Refresh the page or navigate to login
};
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo"><img src="data:image/png;base64,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" alt="" className="logo-img" />
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
{user ?(
  <>
   
            <div className="navbar-button">Create Post</div>
            <div className="navbar-button">Profile</div>
            <div className='navbar-button'>{user.username}</div>
            <button className="navbar-button logout" onClick={handleLogout}>
              Logout
            </button>
          
  </>
):(
  <>
          <a href="/login" className="navbar-link">Login</a>
          <a href="/register" className="navbar-link">Register</a>
  </>
)}
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
