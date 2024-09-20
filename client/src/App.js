import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {}, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={!!token} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={!token ? <AuthForm setToken={setToken} /> : <TaskList />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
