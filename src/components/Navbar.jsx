import React, { useState } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
import { IoIosCart } from 'react-icons/io';
import { useCartContext } from './Context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartLength } = useCartContext();

  const handleNavigation = (route) => {
    onNavigate(true); // Trigger loading
    setTimeout(() => {
      onNavigate(false); // Stop loading
      navigate(route);
    }, 2000); // 2 seconds delay
  };

  const isActive = (path) => location.pathname === path;

  const storedUser = JSON.parse(localStorage.getItem('bookUser'));
  const name = storedUser ? storedUser.name : 'Guest';
  const firstLetter = name[0].toUpperCase();

  return (
    <div className="navbar-mobile fixed bottom-0 left-0 right-0 h-[12vh] bg-[#0E0E12] shadow-lg flex justify-around items-center text-[#ECEDF0] z-10">
      <div
        className={`flex flex-col justify-around items-center mt-2 ${
          isActive('/') ? 'text-[#1ED760]' : ''
        }`}
        onClick={() => handleNavigation('/')}
        aria-label="Home"
      >
        <FaHome
          className={`text-[#ECEDF0] h-[24px] w-[24px] transition duration-200 ease-in-out ${
            isActive('/') ? 'text-[#1ED760]' : ''
          }`}
        />
        <p className={`mt-1 text-[10px] ${isActive('/') ? 'text-[#1ED760]' : ''}`}>Home</p>
      </div>

      {/* search */}
          <div 
             className={`flex flex-col items-center mt-2 ${isActive("/search") ? "text-[#1ED760]" : ""}`} 
             onClick={() => handleNavigation("/search")} 
             aria-label="Search"
           >
             <FaSearch className={`text-[#ECEDF0] h-[24px] w-[24px] transition duration-200 ease-in-out ${isActive("/search") ? "text-[#1ED760]" : ""}`} />
             <p className={`mt-1 text-[10px] ${isActive("/search") ? "text-[#1ED760]" : ""}`}>Search</p>
          </div>

          {/* Cart */}
          <div 
             onClick={() => handleNavigation("/cart")} 
             className={`relative flex flex-col items-center mt-2 ${isActive("/cart") ? "text-[#1ED760]" : ""}`} 
             aria-label="Cart"
           >
             {cartLength > 0 && (
               <span className="absolute top-0 right-0 w-4 h-4 text-xs flex items-center justify-center bg-main text-spotify-accent font-bold p-1 rounded-full">
                {cartLength}
               </span>
             )}
             <IoIosCart className={`h-[24px] w-[24px] text-[#ECEDF0] transition duration-200 ease-in-out ${isActive("/cart") ? "text-[#1ED760]" : ""}`} />
             <p className={`mt-1 text-[10px] ${isActive("/cart") ? "text-[#1ED760]" : ""}`}>Cart</p>
           </div>

            {/* about */}
           <div 
             onClick={() => handleNavigation("/about")} 
             className={`flex flex-col items-center mt-2 ${isActive("/about") ? "text-[#1ED760]" : ""}`} 
             aria-label="Your Bio"
           >
             <div className='bg-white flex justify-center items-center rounded-full p-3 h-7 w-7'>
                 <h1 className='font-bold text-spotify-accent'>{firstLetter}</h1>
             </div>
             <p className={`mt-1 text-[10px] ${isActive("/about") ? "text-[#1ED760]" : ""}`}>Me</p>
           </div>
    </div>
  );
};

export default Navbar;
