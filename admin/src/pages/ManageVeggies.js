import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addVeggie, getVeggies } from '../utils/pizzaApi'; // Replace with your actual API utility functions

const ManageVeggies = () => {
    const [veggies, setVeggies] = useState([]);
    const [newVeggie, setNewVeggie] = useState({ name: '', quantity: '' });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({ name: '', quantity: '' });
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVeggies = async () => {
            try {
                setLoading(true)
                const result = await getVeggies();
                setVeggies(result || []);
                setFetchError(null);
            } catch (error) {
                console.error('Error fetching veggies:', error);
                setFetchError('Error fetching veggies. Please try again later.');
            } finally {
                setLoading(false)
            }
        };
        fetchVeggies();
    }, []);

    const validateFields = () => {
        const newErrors = { name: '', quantity: '' };
        if (!newVeggie.name.trim()) {
            newErrors.name = 'Veggie name is required.';
        }
        if (!newVeggie.quantity || newVeggie.quantity <= 0) {
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
            await addVeggie(newVeggie);
            setNewVeggie({ name: '', quantity: '' });
            const result = await getVeggies();
            setVeggies(result || []);
            toast.success('Veggie added successfully!', { autoClose: 3000 });
        } catch (error) {
            toast.error('Error adding veggie. Please try again.', { autoClose: 3000 });
            console.error('Error adding veggie:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            <ToastContainer />
            <div className="bg-green-700 text-white py-4 px-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Manage Veggies</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form Section */}
                <div className="bg-gradient-to-br from-[#f9f9f9] via-[#b3f99c] to-[#ffffff] p-8 rounded-xl shadow-lg border-2 border-green-500">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-900 text-center tracking-tight">Add New Veggie</h3>
                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 md:space-y-8">
                        <div className="relative">
                            <label className="block text-gray-800 font-medium mb-2 text-sm md:text-base">Veggie Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={newVeggie.name}
                                    onChange={(e) => setNewVeggie({ ...newVeggie, name: e.target.value })}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-400'}`}
                                    placeholder="Enter or select veggie name"
                                />
                                <FaCaretDown
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer transition-transform duration-300 hover:text-green-500"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-xl mt-1 max-h-48 overflow-auto transition-opacity duration-300 ease-in-out">
                                        {veggies.map((veggie) => (
                                            <li
                                                key={veggie._id}
                                                className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => {
                                                    setNewVeggie({ ...newVeggie, name: veggie.name });
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                {veggie.name}
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
                                value={newVeggie.quantity}
                                onChange={(e) => setNewVeggie({ ...newVeggie, quantity: Number(e.target.value) })}
                                className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-400'}`}
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition-transform duration-300 ease-in-out"
                        >
                            Add Veggie
                        </button>
                    </form>
                </div>


                {/* List Section */}
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold mb-6 text-white text-center">Veggies List</h3>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : fetchError ? (
                        <p className="text-red-500 text-center">{fetchError}</p>
                    ) : veggies.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {veggies.map((veggie) => (
                                <li
                                    key={veggie._id}
                                    className="bg-gradient-to-r from-green-500 to-green-300 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-30 pointer-events-none"></div>
                                    <div className="relative z-10 flex flex-col space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-2xl font-bold text-white">{veggie.name}</h4>
                                            <span className="text-white text-xl font-semibold">{veggie.quantity}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-yellow-300 text-center">No veggies available. Add a veggie to view it here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageVeggies;
