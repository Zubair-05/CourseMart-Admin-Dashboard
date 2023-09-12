import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../config'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      navigate("/courses");
      return;
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: email,
        password: password,
      },
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/courses");
    } else {
      alert("Invalid credentials");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-6">Login to see all the courses</h1>
      <form className="flex flex-col space-y-4">
        <label htmlFor="email" className="font-semibold text-xl">
          Email:
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-64"
        />
        <label htmlFor="password" className="font-semibold text-xl">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-64"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Already a user? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
