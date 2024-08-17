import React from 'react';
import 'animate.css';
import img1 from "../utils/images/Pizza-Base-1.jpg";
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-200 via-teal-500
         to-teal-200 text-white relative overflow-hidden pt-[80px] border-b border-black">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-20">
                    <svg className="w-full h-full animate-pulse" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="100" fill="rgba(255, 255, 255, 0.2)" />
                    </svg>
                </div>
                <div className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] opacity-20">
                    <svg className="w-full h-full animate-pulse" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="100" fill="rgba(255, 255, 255, 0.2)" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
                    Discover Our Unique Pizza Experience
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center mb-16 animate__animated animate__fadeIn animate__delay-2s leading-relaxed">
                    Dive into a world of flavors with our ultimate pizza customization app. From classic to exotic, create a pizza that suits your taste and enjoy our quick delivery service.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-300 text-black p-6 md:p-8 rounded-2xl shadow-3xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300 ease-in-out bg-opacity-90 border border-gray-300 hover:border-teal-600 animate__animated animate__fadeIn animate__delay-3s">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 relative">
                            <span className="relative z-10">Why Choose Us?</span>
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-500 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
                        </h2>
                        <ul className="list-disc pl-5 space-y-3">
                            <li className="transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-teal-500">Vast array of customizable options with premium ingredients.</li>
                            <li className="transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-teal-500">Lightning-fast delivery, ensuring your pizza is always hot.</li>
                            <li className="transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-teal-500">Sleek and user-friendly interface for a hassle-free experience.</li>
                            <li className="transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-teal-500">Crafted with love and high-quality ingredients for the best taste.</li>
                        </ul>
                    </div>

                    <img
                        src={img1}
                        alt="Delicious Pizza"
                        className="w-full max-w-md rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 ease-in-out hover:brightness-110 animate__animated animate__fadeIn animate__delay-4s"
                    />
                </div>

                <div className="text-center mt-12">
                    <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 animate__animated animate__fadeIn animate__delay-5s">
                        Ready to craft your perfect pizza?
                    </p>
                    <Link
                        to="/customize"
                        className="inline-block bg-gradient-to-r from-teal-400 to-yellow-500 text-white py-3 border-2 font-bold border-white px-6 rounded-full hover:from-yellow-400 hover:to-teal-600 hover:scale-110 animate__animated animate__pulse animate__delay-5s"
                    >
                        Start Customizing
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
