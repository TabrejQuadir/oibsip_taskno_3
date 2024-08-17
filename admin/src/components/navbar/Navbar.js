import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaPepperHot, FaCheese, FaLeaf, FaDrumstickBite, FaBars } from 'react-icons/fa';
import "./Navbar.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        if (isOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsAnimating(false);
            }, 500);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    return (
        <nav className="bg-opacity-30 backdrop-filter backdrop-blur-md text-white p-4 shadow-lg rounded-lg glass-effect navv">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink to="/admin" className="text-lg sm:text-xl md:text-xl lg:text-2xl text-black font-bold hover:scale-105 transition-all duration-300 flex items-center ">
                    <FaHome className="mr-2" /> Admin Dashboard
                </NavLink>
                <div className="hidden md:flex space-x-4 md:space-x-6">
                    <NavLink
                        to="/admin/bases"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        <FaList className="mr-2" /> Manage Bases
                    </NavLink>
                    <NavLink
                        to="/admin/sauces"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        <FaPepperHot className="mr-2" /> Manage Sauces
                    </NavLink>
                    <NavLink
                        to="/admin/cheeses"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        <FaCheese className="mr-2" /> Manage Cheeses
                    </NavLink>
                    <NavLink
                        to="/admin/veggies"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        <FaLeaf className="mr-2" /> Manage Veggies
                    </NavLink>
                    <NavLink
                        to="/admin/meats"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        <FaDrumstickBite className="mr-2" /> Manage Meats
                    </NavLink>
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        className="text-white p-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-700 hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                        onClick={handleToggle}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle navigation"
                    >
                        <FaBars className="w-6 h-6 z-50" />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div
                    id="mobile-menu"
                    className={`fixed inset-0 flex flex-col items-center justify-center space-y-4 ${isOpen ? 'open' : ''} ${isAnimating ? 'closing' : ''}`}
                >
                    <NavLink
                        to="/admin/bases"
                        className="nav-link text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                        onClick={handleToggle}
                    >
                        <FaList className="mr-2" /> Manage Bases
                    </NavLink>
                    <NavLink
                        to="/admin/sauces"
                        className="nav-link text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                        onClick={handleToggle}
                    >
                        <FaPepperHot className="mr-2" /> Manage Sauces
                    </NavLink>
                    <NavLink
                        to="/admin/cheeses"
                        className="nav-link text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                        onClick={handleToggle}
                    >
                        <FaCheese className="mr-2" /> Manage Cheeses
                    </NavLink>
                    <NavLink
                        to="/admin/veggies"
                        className="nav-link text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                        onClick={handleToggle}
                    >
                        <FaLeaf className="mr-2" /> Manage Veggies
                    </NavLink>
                    <NavLink
                        to="/admin/meats"
                        className="nav-link text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                        onClick={handleToggle}
                    >
                        <FaDrumstickBite className="mr-2" /> Manage Meats
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
