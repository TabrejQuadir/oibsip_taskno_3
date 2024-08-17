import React, { useState } from 'react';
import smallBaseImage from '../../utils/images/Pizza-Base-1.jpg';
import mediumBaseImage from '../../utils/images/Pizza-Base-2.jpg';
import largeBaseImage from '../../utils/images/Pizza-Base-3.jpg';
import premiumBaseImage from '../../utils/images/Pizza-Base-4.jpg';
import classicBaseImage from '../../utils/images/Pizza-Base-5.jpg';
import { FaTimes } from 'react-icons/fa';
import "./DashboardModal.css"

const baseImages = {
    small: smallBaseImage,
    medium: mediumBaseImage,
    large: largeBaseImage,
    premium: premiumBaseImage,
    classic: classicBaseImage,
};

const DashboardModal = ({ order, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!order && !isExiting) return null;
    const baseImage = baseImages[order.base.toLowerCase()] || 'path/to/default_image.png';
    return (
        <div className={`modal-overlay ${isExiting ? 'fade-out' : ''}`}>
            <div className={`modal-content mx-4 ${isExiting ? 'modal-content-exit' : ''}`}>
                <button
                    onClick={handleClose}
                    className="modal-close top-4 right-4 text-2xl text-white hover:text-red-500 transition-all duration-300 ease-in-out transform hover:rotate-90"
                    aria-label="Close"
                >
                    <FaTimes />
                </button>
                <div className="flex items-center justify-center mb-6">
                    <img src={baseImage} alt="Pizza Base" className="lg:w-75 lg:h-44 w-40 object-contain rounded-full border-2 border-purple-500 shadow-xl transform hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-gray-800 p-6 rounded-lg bg-white shadow-xl">
                    <p className="lg:text-4xl md:text-3xl sm:text-3xl font-extrabold mb-3 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700">
                        {`${order.base} ${order.meat.toLowerCase()} Pizza`}
                    </p>
                    <div className="space-y-3 ">
                        <p className="flex items-center text-lg">
                            <span className="font-bold text-gray-700 mr-3 bg-yellow-200 px-3 py-1 rounded-full shadow-md">Base:</span>
                            <span className="text-gray-800">{order.base}</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="font-bold text-gray-700 mr-3 bg-yellow-200 px-3 py-1 rounded-full shadow-md">Meat:</span>
                            <span className="text-gray-800">{order.meat}</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="font-bold text-gray-700 mr-3 bg-yellow-200 px-3 py-1 rounded-full shadow-md">Cheese:</span>
                            <span className="text-gray-800">{order.cheese}</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="font-bold text-gray-700 mr-3 bg-yellow-200 px-3 py-1 rounded-full shadow-md">Sauce:</span>
                            <span className="text-gray-800">{order.sauce}</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="font-bold text-gray-700 mr-3 bg-yellow-200 px-3 py-1 rounded-full shadow-md">Veggies:</span>
                            <span className="text-gray-800">{order.veggies.join(', ')}</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="font-bold text-gray-700 mr-3 bg-yellow-200 px-3 py-1 rounded-full shadow-md">Status:</span>
                            <span className={`font-semibold ${order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>{order.status}</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="font-bold text-gray-700 mr-3 bg-yellow-200 px-3 py-1 rounded-full shadow-md">Price:</span>
                            <span className="text-gray-800 text-lg">${order.price.toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardModal;
