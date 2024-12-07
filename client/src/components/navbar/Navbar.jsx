import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Make sure to import the custom CSS file

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar expanded={expanded} expand="lg" bg="dark" variant="dark" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="logo">Logo</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle 
          aria-controls="navbar-nav" 
          onClick={() => setExpanded(!expanded)} 
        />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
