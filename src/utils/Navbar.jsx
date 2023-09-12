import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../config'
import SearchBar from './SearchBar'
import Sidebar from './Sidebar'
import Menu from './Menu'
const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const Navigate = useNavigate();
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
      <div className="flex items-center">

        {token && (
          <>
            <div className='hidden sm:flex w-full '>
              <SearchBar />
            </div>
            <div className='flex sm:hidden'>
              <Sidebar />
            </div>
            <div className='hidden sm:flex'>
              <Menu />
            </div>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
