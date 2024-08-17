import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.';
import logo from '../../utils/images/Logo.png';
import "./Navbar.css"

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedButton, setSelectedButton] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleProtectedRoute = (e, path, buttonName) => {
        if (!isAuthenticated) {
            e.preventDefault();
            navigate('/login');
        } else {
            setSelectedButton(buttonName);
            navigate(path);
        }
    };

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

    return (
        <nav className={`fixed w-full top-0 left-0 z-50 backdrop-blur-md bg-opacity-30 shadow-lg transition-all duration-300 ${isOpen ? 'bg-transparent' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-0">
                    <img src={logo} alt="logo" className="h-14 w-auto" />
                    <Link
                        to="/"
                        className={`text-2xl md:text-3xl lg:text-4xl font-extrabold transition-colors duration-300 pl-0.5 sm:pl-1 md:pl-1.5 lg:pl-2 ${isOpen ? 'text-teal-600' : ''} hover:scale-105`}
                        onClick={() => setSelectedButton('PizzaHub')}
                    >
                        PizzaHub
                    </Link>
                </div>
                <div className="hidden md:flex space-x-8">
                    <>
                        <button
                            className={`text-black  ${selectedButton === 'customize' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`}
                            onClick={(e) => handleProtectedRoute(e, '/customize', 'customize')}
                        >
                            Customize
                        </button>
                        <button
                            className={`text-black ${selectedButton === 'dashboard' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 hover:text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`}
                            onClick={(e) => handleProtectedRoute(e, '/dashboard', 'dashboard')}
                        >
                            Dashboard
                        </button>
                    </>
                    <Link to="/about" className={`text-black ${selectedButton === 'about' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:bg-gradient-to-r hover:text-white hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`} onClick={() => setSelectedButton('about')}>
                        About
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <Link to="/profile" className={`hidden md:block text-black p-2 rounded-full ${selectedButton === 'profile' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`} onClick={() => setSelectedButton('profile')}>
                            <FaUser className="text-2xl" />
                        </Link>
                    ) : (
                        <Link to="/login" className={`hidden md:block  text-black p-2 rounded-full ${selectedButton === 'login' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`} onClick={() => setSelectedButton('login')}>
                            <FaSignInAlt className="text-2xl" />
                        </Link>
                    )}
                    {isAuthenticated && (
                        <button
                            className={`hidden md:block  text-black p-2 rounded-full ${selectedButton === 'logout' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`}
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt className="text-2xl" />
                        </button>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        className={`toggle-button ${isOpen ? 'open' : ''}`}
                        onClick={handleToggle}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>
            {isOpen && (
                <div
                    id="mobile-menu"
                    className={`fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 ${isOpen ? 'open' : ''} ${isAnimating ? 'closing' : ''}`}
                >

                    <button
                        className={`text-white ${selectedButton === 'customize' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`}
                        onClick={(e) => { handleProtectedRoute(e, '/customize', 'customize'); handleToggle(); }}
                    >
                        Customize
                    </button>
                    <button
                        className={`text-white ${selectedButton === 'dashboard' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`}
                        onClick={(e) => { handleProtectedRoute(e, '/dashboard', 'dashboard'); handleToggle(); }}
                    >
                        Dashboard
                    </button>
                    <Link to="/about" className={`text-white ${selectedButton === 'about' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`} onClick={() => { setSelectedButton('about'); handleToggle(); }}>
                        About
                    </Link>
                    {isAuthenticated && (
                        <Link to="/profile" className={`text-white ${selectedButton === 'profile' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`} onClick={() => { setSelectedButton('profile'); handleToggle(); }}>
                            Profile
                        </Link>
                    )}
                    {isAuthenticated && (
                        <button
                            className={`text-white ${selectedButton === 'logout' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`}
                            onClick={() => { handleLogout(); handleToggle(); }}
                        >
                            Logout
                        </button>
                    )}
                    {!isAuthenticated && (
                        <Link to="/login" className={`text-white ${selectedButton === 'login' ? 'bg-black text-white' : 'bg-gradient-to-r from-teal-500 to-teal-700'} hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105`} onClick={() => { setSelectedButton('login'); handleToggle(); }}>
                            Login
                        </Link>
                    )}
                </div>
            )}

        </nav>
    );
};

export default Navbar;
