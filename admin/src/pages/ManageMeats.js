import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addMeat, getMeats } from '../utils/pizzaApi';

const ManageMeats = () => {
    const [meats, setMeats] = useState([]);
    const [newMeat, setNewMeat] = useState({ name: '', quantity: '' });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({ name: '', quantity: '' });
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeats = async () => {
            try {
                setLoading(true);
                const result = await getMeats()
                setMeats(result || []);
                setFetchError(null);
            } catch (error) {
                console.error('Error fetching meats:', error);
                setFetchError('Error fetching meats. Please try again later.')
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchMeats();
    }, []);

    const validateFields = () => {
        const newErrors = { name: '', quantity: '' };
        if (!newMeat.name.trim()) {
            newErrors.name = 'Meat name is required.';
        }
        if (!newMeat.quantity || newMeat.quantity <= 0) {
            newErrors.quantity = 'Quantity must be greater than zero.';
        }
        setErrors(newErrors);
        return !newErrors.name && !newErrors.quantity;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            toast.error('Please fill out the required fields correctly.', { autoClose: 5000 });
            setTimeout(() => {
                setErrors({ name: '', quantity: '' });
            }, 3000);
            return;
        }

        try {
            await addMeat(newMeat)
            setNewMeat({ name: '', quantity: '' });
            const result = await getMeats()
            toast.success('Meat added successfully!', { autoClose: 3000 });
        } catch (error) {
            toast.error('Error adding meat. Please try again.', { autoClose: 3000 });
            console.error('Error adding meat:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            <ToastContainer />
            <div className="bg-red-700 text-white py-4 px-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Manage Meats</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form Section */}
                <div className="bg-gradient-to-br from-[#f9f9f9] via-[#f49595] to-[#ffffff] p-8 rounded-xl shadow-lg border-2 border-red-400">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center tracking-tight">Add New Meat</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <label className="block text-gray-800 font-medium mb-2 text-sm md:text-base">Meat Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={newMeat.name}
                                    onChange={(e) => setNewMeat({ ...newMeat, name: e.target.value })}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
                                        }`}
                                    placeholder="Enter or select meat name"
                                />
                                <FaCaretDown
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer transition-transform duration-300 hover:text-red-500"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-xl mt-1 max-h-48 overflow-auto transition-opacity duration-300 ease-in-out">
                                        {meats.map((meat) => (
                                            <li
                                                key={meat._id}
                                                className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => {
                                                    setNewMeat({ ...newMeat, name: meat.name });
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                {meat.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-800 font-medium mb-2 text-sm md:text-base">Quantity</label>
                            <input
                                type="number"
                                value={newMeat.quantity}
                                onChange={(e) => setNewMeat({ ...newMeat, quantity: Number(e.target.value) })}
                                className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
                                    }`}
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 transition-transform duration-300 ease-in-out"
                        >
                            Add Meat
                        </button>
                    </form>
                </div>

                {/* List Section */}
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold mb-6 text-white text-center">Meats List</h3>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-t-4 border-red-500 border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : fetchError ? (
                        <p className="text-red-500 text-center">{fetchError}</p>
                    ) : meats.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {meats.map((meat) => (
                                <li
                                    key={meat._id}
                                    className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-30 pointer-events-none"></div>
                                    <div className="relative z-10 flex flex-col space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-2xl font-bold text-white">{meat.name}</h4>
                                            <span className="text-white text-xl font-semibold">{meat.quantity}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-yellow-300 text-center">No meat available. Add a meat to view it here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageMeats;
