import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../utils/images/Logo.png';
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-teal-500 to-teal-700 text-white py-12 px-6 overflow-hidden shadow-lg backdrop-blur-md">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/1600x900/?pizza')] bg-cover bg-center opacity-30 logo"></div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center space-y-8">

        {/* Logo and Info */}
        <div className="flex flex-col items-center text-center z-10 space-y-4 md:space-y-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-6">
            <img src={logo} alt="PizzaHub logo" className="h-16 w-24 filter drop-shadow-lg rounded-lg transform transition-transform duration-500 hover:scale-105" />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight gradient-text">
              Pizza<span className="text-yellow-300">Hub</span>
            </h1>
          </div>
          <p className="text-base md:text-lg leading-relaxed">
            Experience the future of pizza with our custom creations and innovative flavors. Elevate your taste today.
          </p>
        </div>

        {/* Quick Links and Contact Us */}
        <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl space-y-8 md:space-y-0">

          {/* Links */}
          <div className="flex-1 z-10">
            <h2 className="text-3xl font-semibold mb-4 border-b-4 border-yellow-400 pb-2">
              Quick Links
            </h2>
            <ul className="space-y-0 sm:space-y-1 md:space-y-2 lg:space-y-3 ">
              <li><Link to="/" className="footer-link transition-transform transform hover:scale-105">Home</Link></li>
              <li><Link to="/customize" className="footer-link transition-transform transform hover:scale-105">Customize</Link></li>
              <li><Link to="/about" className="footer-link transition-transform transform hover:scale-105">About Us</Link></li>
              <li><Link to="/" className="footer-link transition-transform transform hover:scale-105">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-1 z-10">
            <h2 className="text-3xl font-semibold mb-4 border-b-4 border-yellow-400 pb-2">
              Contact Us
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-yellow-400 text-2xl transform transition-transform hover:scale-110" aria-label="Address" /> <span>123 Pizza Street, Pizza City</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-yellow-400 text-2xl transform transition-transform hover:scale-110" aria-label="Phone Number" /> <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-400 text-2xl transform transition-transform hover:scale-110" aria-label="Email Address" /> <span>info@pizzahub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 text-center">
        <p className="text-black relative z-10 mb-4">&copy; {new Date().getFullYear()} PizzaHub. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="https://twitter.com" className="social-icon transition-transform transform hover:scale-110" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" className="social-icon transition-transform transform hover:scale-110" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" className="social-icon transition-transform transform hover:scale-110" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
