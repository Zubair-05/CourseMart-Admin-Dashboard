import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import {BASE_URL} from '../../config'

function Landing() {


  const user = localStorage.getItem("token");
  if (user) {
    return <Navigate to="/courses" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to the CourseMart!</h1>
      <div className="flex space-x-4">
        <NavLink
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
        >
          Register
        </NavLink>
      </div>
    </div>
  );
}

export default Landing;
