import React from "react";
import { Navbar, Button, Container } from "react-bootstrap";

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand href="/" className="font-weight-bold">
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {isLoggedIn && (
            <Button variant="outline-light" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
