// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaPepperHot, FaCheese, FaLeaf, FaDrumstickBite, FaUser, FaClipboardList } from 'react-icons/fa';
import { getUserProfile } from '../utils/authApi';
import { useAuth } from '../context/useAuth';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { loading, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile();
                setUser(response);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching user profile');
            }
        };
        if (isAuthenticated !== undefined) {
            fetchUserProfile();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 flex flex-col">
            <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow-lg">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center tracking-tight">Admin Dashboard</h1>
            </header>
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Admin Profile Section */}
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 ease-in-out w-full md:w-2/3">
                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                                <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-0">
                                    <div className="relative w-20 md:w-24 lg:w-28 h-20 md:h-24 lg:h-28 rounded-full overflow-hidden bg-gray-200 border-4 border-blue-600">
                                        <FaUser className="text-4xl md:text-5xl lg:text-6xl text-blue-600 absolute inset-0 m-auto" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-800">{user ? user.name : 'Loading...'}</h2>
                                    <p className="text-sm md:text-base lg:text-xl text-gray-600">{user ? user.email : 'Loading...'}</p>
                                </div>
                                <div className="flex-shrink-0 mt-4 md:mt-0">
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="relative bg-white p-5 pl-20 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400 hover:bg-blue-50 overflow-hidden w-full md:w-1/3">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-transparent opacity-50 pointer-events-none"></div>
                            <Link
                                to="/admin/orders"
                                className="flex flex-col items-center justify-center space-y-4 text-gray-800 hover:text-blue-700 relative z-10 pr-16 py-0"
                            >
                                <FaClipboardList className="text-4xl md:text-5xl lg:text-6xl text-blue-600" />
                                <div className="text-center">
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">View Orders</h2>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-600 text-nowrap">Check all customer orders and details.</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Sections */}
                    <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center">
                        <div className="relative bg-white p-5 sm:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400 hover:bg-blue-50 overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-transparent opacity-50 pointer-events-none"></div>
                            <Link
                                to="/admin/bases"
                                className="flex flex-col items-center justify-center space-y-4 text-gray-800 hover:text-blue-700 relative z-10"
                            >
                                <FaTachometerAlt className="text-4xl md:text-5xl lg:text-6xl text-blue-600" />
                                <div className="text-center">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Manage Bases</h2>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-600">Effortlessly manage and organize base ingredients.</p>
                                </div>
                            </Link>
                        </div>
                        <div className="relative bg-white p-5 sm:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-red-400 hover:bg-red-50 overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-transparent opacity-50 pointer-events-none"></div>
                            <Link
                                to="/admin/sauces"
                                className="flex flex-col items-center justify-center space-y-4 text-gray-800 hover:text-red-700 relative z-10"
                            >
                                <FaPepperHot className="text-4xl md:text-5xl lg:text-6xl text-red-600" />
                                <div className="text-center">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Manage Sauces</h2>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-600">Add, edit, and oversee your sauce collection with style.</p>
                                </div>
                            </Link>
                        </div>
                        <div className="relative bg-white p-5 sm:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400 hover:bg-yellow-50 overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-transparent opacity-50 pointer-events-none"></div>
                            <Link
                                to="/admin/cheeses"
                                className="flex flex-col items-center justify-center space-y-4 text-gray-800 hover:text-yellow-700 relative z-10"
                            >
                                <FaCheese className="text-4xl md:text-5xl lg:text-6xl text-yellow-600" />
                                <div className="text-center">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Manage Cheeses</h2>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-600">Organize your cheese selections with ease.</p>
                                </div>
                            </Link>
                        </div>
                        <div className="relative bg-white p-5 sm:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-green-400 hover:bg-green-50 overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-transparent opacity-50 pointer-events-none"></div>
                            <Link
                                to="/admin/veggies"
                                className="flex flex-col items-center justify-center space-y-4 text-gray-800 hover:text-green-700 relative z-10"
                            >
                                <FaLeaf className="text-4xl md:text-5xl lg:text-6xl text-green-600" />
                                <div className="text-center">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Manage Veggies</h2>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-600">Manage your veggie inventory with simplicity.</p>
                                </div>
                            </Link>
                        </div>
                        <div className="relative bg-white p-5 sm:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-400 hover:bg-orange-50 overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-transparent opacity-50 pointer-events-none"></div>
                            <Link
                                to="/admin/meats"
                                className="flex flex-col items-center justify-center space-y-4 text-gray-800 hover:text-orange-700 relative z-10"
                            >
                                <FaDrumstickBite className="text-4xl md:text-5xl lg:text-6xl text-orange-600" />
                                <div className="text-center">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Manage Meats</h2>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-600">Efficiently handle your meat options.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
