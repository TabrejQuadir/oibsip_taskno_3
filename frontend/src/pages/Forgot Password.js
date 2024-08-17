import React, { useState } from 'react';
import { forgotPassword } from '../utils/authApi';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await forgotPassword(email);
            setMessage('✅ ' + response.data);
            setError('');
        } catch (error) {
            setError('❌ ' + (error.response?.data?.message || 'Failed to send reset email'));
            setMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 px-4 py-12 sm:px-6 lg:px-8">
            <div className="relative bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg border border-gray-200 bg-opacity-90 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 lg:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 tracking-wide">
                    Reset Password
                </h1>
                {message && (
                    <div className="text-center mb-4 sm:mb-6 lg:mb-6 text-base sm:text-lg font-semibold text-green-700 bg-green-100 py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md animate-bounce">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="text-center mb-4 sm:mb-6 lg:mb-6 text-base sm:text-lg font-semibold text-red-700 bg-red-100 py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md animate-bounce">
                        {error}
                    </div>
                )}
                <form onSubmit={handleForgotPassword} className="space-y-6 sm:space-y-8 lg:space-y-10">
                    <div className="relative">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2 sm:mb-3 tracking-wider">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 border border-gray-300 shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105"
                            placeholder="Enter your email"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 sm:py-3 rounded-full text-white font-bold tracking-wider shadow-lg transition duration-300 ease-in-out transform ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:shadow-2xl hover:-translate-y-1'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                                Sending...
                            </div>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
