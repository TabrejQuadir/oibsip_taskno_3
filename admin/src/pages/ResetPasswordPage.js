import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../utils/authApi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await resetPassword(password, token);
            setMessage('✅ ' + response.data);
            setError('');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reset password');
            setMessage('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-green-500 to-blue-400 px-4 py-12">
            {/* Marquee Text */}
            <div className="marquee-container">
                <div className="marquee">
                    Welcome to the PizzaHub Dashboard! Reset & Login to Manage the Admin Panel
                </div>
            </div>
            <div className="relative bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border border-gray-200 bg-opacity-90 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-6 sm:mb-8 lg:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 tracking-wide">
                    Reset Password
                </h1>
                {message && (
                    <div className="text-green-600 text-center mb-6 bg-green-100 py-3 px-6 rounded-lg shadow-md animate-pulse">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="text-red-600 text-center mb-6 bg-red-100 py-3 px-6 rounded-lg shadow-md animate-pulse">
                        {error}
                    </div>
                )}
                <form onSubmit={handleResetPassword} className="space-y-8">
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">New Password:</label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 top-8 flex items-center pr-3 cursor-pointer"
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-500" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password:</label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-3 top-8 flex items-center pr-3 cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-500" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500  text-white font-semibold tracking-wider shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 ease-in-out transform "
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
