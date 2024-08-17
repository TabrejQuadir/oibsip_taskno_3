import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSignInAlt, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { login } from '../utils/authApi';
import { useAuth } from '../context/AuthContext.';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setIsAuthenticated } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.token);
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    return (
        <div className="relative flex items-center justify-center pt-20 px-4 sm:px-6 min-h-screen bg-gradient-to-br from-teal-400 to-blue-600">
            <div className="relative bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md border border-gray-200 backdrop-blur-lg bg-opacity-50">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-6 sm:mb-8 lg:mb-12 text-center tracking-wide">Login</h1>


                {error && (
                    <div className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg shadow-md">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                    <div className="relative">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                                required
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
                    <div className="flex justify-between items-center">
                        <Link to="/forgot-password" className="text-black hover:underline font-medium text-sm">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}  
                        className={`w-full bg-teal-600 text-white py-2 sm:py-3 rounded-md shadow-md hover:bg-teal-700 transition duration-300 ease-in-out flex items-center justify-center transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <FaSpinner className="animate-spin text-lg" />
                        ) : (
                            <>
                                <FaSignInAlt className="inline mr-2 text-lg" /> Login
                            </>
                        )}
                    </button>
                </form>
                <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-gray-600">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-black hover:underline font-medium">Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
