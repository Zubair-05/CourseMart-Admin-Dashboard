import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../../config'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    const response = await fetch(`${BASE_URL}/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await response.json();
    if (data) {
      localStorage.setItem("token", data.token);
      console.log(`inside register ${data.token}`);
      navigate("/courses");
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-6">Register to the website</h1>
      <div className="flex flex-col space-y-4">
        <label htmlFor="email" className="font-semibold text-xl">
          Email:
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-80"
        />
        <label htmlFor="username" className="font-semibold text-xl">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-80"
        />
        <label htmlFor="password" className="font-semibold text-xl">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-80"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </div>
      <p className="mt-4">
        Already a user? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
