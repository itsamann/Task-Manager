import React, { useState } from "react";
import { registerUser, loginUser } from "../api/authApi";

const AuthForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password }); // Check the output here

    try {
      if (isLogin) {
        const response = await loginUser(email, password); // Pass email and password directly
        setToken(response.token); // Store token in local storage
        localStorage.setItem("token", response.token); // Save token in local storage
      } else {
        const response = await registerUser(email, password); // Pass email and password directly
        setMessage(response.message || "User registered, please login.");
        setIsLogin(true); // Switch to login mode
      }
    } catch (error) {
      setMessage(error.response?.data.message || error.message);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
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
