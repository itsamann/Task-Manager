import React, { useState } from "react";
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
    setErrors([]); // Reset errors on submit

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
        setIsLogin(true); // Switch to login mode
        // Clear all fields after registration
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      }
    } catch (error) {
      if (error.response?.data.errors) {
        // Set specific validation errors if they exist
        setErrors(error.response.data.errors);
      } else {
        setMessage(error.response?.data.message || error.message);
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {message && <p>{message}</p>}
      {errors.length > 0 && (
        <div>
          {errors.map((error) => (
            <p key={error.msg}>{error.msg}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default AuthForm;
