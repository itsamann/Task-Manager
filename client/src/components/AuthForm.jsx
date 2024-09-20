import React, { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { registerUser, loginUser } from "../api/authApi";

const AuthForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      if (isLogin) {
        const response = await loginUser(email, password);
        setToken(response.token);
        localStorage.setItem("token", response.token);
      } else {
        const response = await registerUser(
          email,
          password,
          firstName,
          lastName
        );
        setMessage(response.message || "User registered, please login.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      }
    } catch (error) {
      if (error.response?.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessage(error.response?.data.message || error.message);
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Card
        className="shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h2 className="text-center">{isLogin ? "Login" : "Register"}</h2>
        {message && <Alert variant="info">{message}</Alert>}
        {errors.length > 0 && (
          <Alert variant="danger">
            {errors.map((error) => (
              <p key={error.msg}>{error.msg}</p>
            ))}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            {isLogin ? "Login" : "Register"}
          </Button>
        </Form>
        <Button
          variant="link"
          className="mt-3"
          onClick={() => setIsLogin(!isLogin)}
        >
          Switch to {isLogin ? "Register" : "Login"}
        </Button>
      </Card>
    </Container>
  );
};

export default AuthForm;
