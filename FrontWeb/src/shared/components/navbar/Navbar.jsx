import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

export const Navbar = () => {
  return (
    <Navbar bg="light" expand="md" sticky="top">
      <Navbar.Brand href="/">
        <img
          src="../../assets/img/utez.png"
          alt="LOGO UTEZ"
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/user" className="nav-link">
            User
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
