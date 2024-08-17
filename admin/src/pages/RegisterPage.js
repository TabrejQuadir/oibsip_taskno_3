import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { register } from '../utils/authApi';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            await register({ name, email, password, isAdmin });
            setIsAuthenticated(true);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false); 
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center pt-20 px-4 sm:px-6 min-h-screen bg-gradient-to-br from-blue-600 to-teal-400">
            <div className="marquee-container">
                <div className="marquee">
                    Welcome to the PizzaHub Dashboard! Register to Manage the Admin Panel
                </div>
            </div>

            <div className="relative bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg border border-gray-200 backdrop-blur-md bg-opacity-50">
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold mb-6 sm:mb-8 lg:mb-12 text-center tracking-wide">Create an Account</h1>
                {error && <div className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg shadow-md">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="relative">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1 sm:mb-2">Name:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 sm:mb-2">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 sm:mb-2">Password:</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </button>
                        </div>
                    </div>

                    <div className="relative flex items-center">
                        <input
                            id="admin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label htmlFor="admin" className="ml-2 block text-gray-700 font-semibold">
                            Register as Admin
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 sm:py-3 rounded-md shadow-md transition duration-300 ease-in-out flex items-center justify-center transform ${loading ? 'bg-gray-500' : 'bg-teal-600 hover:bg-teal-700 hover:scale-105'}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <FaSpinner className="animate-spin text-lg" />
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
                <p className="mt-4 sm:mt-6 text-center text-gray-600 text-sm sm:text-base">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black hover:underline font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
