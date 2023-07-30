import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {BASE_URL} from '../../config'

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleRoute = () => {
    // window.location.replace(``);
    window.open('https://course-mart-user-dashboard-zubair05.vercel.app/', '_blank');
  }
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white py-4 px-6">
      <div className="flex items-center">
        <NavLink to="/" className="text-3xl font-bold">
          CourseMart-creator
        </NavLink>
      </div>
      <div>
        {token && (
          <>
            {
              location.pathname === '/courses' ? (
                <NavLink
                  to="/create"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors ml-4"
                >
                  Create Course
                </NavLink>) : (
                <NavLink
                  to="/courses"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors ml-4"
                >
                  All Courses
                </NavLink>
              )
            }
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors ml-4"
            >
              Logout
            </button>
            <button
              onClick={handleRoute}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors ml-4"
            >
              Student 
            </button>
          </>
        ) }
      </div>
    </nav>
  );
};

export default Navbar;
