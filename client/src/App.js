import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import TaskList from "./components/TaskList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Optionally validate the token here if necessary
  }, [token]);

  return (
    <div className="App">
      {!token ? (
        <AuthForm setToken={setToken} />
      ) : (
        <>
          <TaskList />
        </>
      )}
    </div>
  );
}

export default App;
