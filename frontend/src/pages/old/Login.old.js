import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5050";

const Login = () => {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        nik,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        // Store the token securely (e.g., in local storage or a cookie)
        localStorage.setItem("token", token);
        console.log("Login successful");
      } else {
        const { message } = response.data;
        console.log("Login failed:", message);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="nik"
        placeholder="NIK"
        value={nik}
        onChange={(e) => setNik(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
