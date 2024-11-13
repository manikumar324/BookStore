// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-custom-dark h-auto  text-white pt-6 py-8 pb-[80px] ">
      <div className="container mx-auto px-6 shadow-2xl">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-bold mb-2">BookBazaar</h2>
            <p className="text-sm text-gray-400">
              Discover your next favorite book. Join our community of readers and writers!
            </p>
          </div>
          
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-bold mb-2">Quick Links</h2>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline text-gray-400">Home</a></li>
              <li><a href="#" className="hover:underline text-gray-400">About Us</a></li>
              <li><a href="#" className="hover:underline text-gray-400">Contact</a></li>
              <li><a href="#" className="hover:underline text-gray-400">Terms of Service</a></li>
              <li><a href="#" className="hover:underline text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-bold mb-2">Connect with Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>
            
          </div>
          
        </div>
        <div className="text-center flex justify-center items-center mt-3 border-t border-gray-700 pt-4">
          <p className="text-sm flex items-center text-gray-400">
            <FaCopyright className="mr-1 text-gray-400" /> 2024 BookBazaar. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;