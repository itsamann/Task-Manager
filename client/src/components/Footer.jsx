import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <Container>
        <p className="mb-0">&copy; 2024 Task Manager. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
