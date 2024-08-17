import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBase, getBases } from '../utils/pizzaApi';

const ManageBases = () => {
    const [bases, setBases] = useState([]);
    const [newBase, setNewBase] = useState({ name: '', quantity: '', price: '' });
    const [errors, setErrors] = useState({ name: '', quantity: '', price: '' });
    const [showBasesDropdown, setShowBasesDropdown] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBases = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const result = await getBases();
                setBases(result || []);
                setFetchError(null);
            } catch (error) {
                console.error('Error fetching bases:', error);
                setFetchError('Error fetching bases. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchBases();
    }, []);

    const validateFields = () => {
        const newErrors = { name: '', quantity: '', price: '' };
        if (!newBase.name.trim()) {
            newErrors.name = 'Base name is required.';
        }
        if (!newBase.quantity || newBase.quantity <= 0) {
            newErrors.quantity = 'Quantity must be greater than zero.';
        }
        if (!newBase.price || newBase.price <= 0) {
            newErrors.price = 'Price must be greater than zero.';
        }
        setErrors(newErrors);
        return !newErrors.name && !newErrors.quantity && !newErrors.price;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            toast.error('Please fill out the required fields correctly.', { autoClose: 5000 });
            setTimeout(() => {
                setErrors({ name: '', quantity: '', price: '' });
            }, 3000);
            return;
        }

        try {
            await addBase(newBase);
            setNewBase({ name: '', quantity: '', price: '' });
            const result = await getBases();
            setBases(result || []);
            toast.success('Base added successfully!', { autoClose: 3000 });
        } catch (error) {
            toast.error('Error adding base. Please try again.', { autoClose: 3000 });
            console.error('Error adding base:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6 bases">
            <ToastContainer className="toastify-container" />
            <div className="bg-blue-900 text-white py-4 px-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Manage Bases</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-[#f9f9f9] via-[#81c2fb] to-[#ffffff] p-8 rounded-xl shadow-lg border-2 border-blue-400">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 text-center tracking-tight">Add New Base</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <label className="block text-gray-800 font-medium mb-2 text-sm md:text-base">Base Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={newBase.name}
                                    onChange={(e) => setNewBase({ ...newBase, name: e.target.value })}
                                    onClick={() => setShowBasesDropdown(!showBasesDropdown)}
                                    onBlur={() => setTimeout(() => setShowBasesDropdown(false), 200)}
                                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
                                    placeholder="Enter or select base name"
                                />
                                <FaCaretDown
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer transition-transform duration-300 hover:text-blue-500"
                                    onClick={() => setShowBasesDropdown(!showBasesDropdown)}
                                />
                                {showBasesDropdown && (
                                    <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-xl mt-1 max-h-48 overflow-auto transition-opacity duration-300 ease-in-out">
                                        {bases.map((base) => (
                                            <li
                                                key={base._id}
                                                className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => {
                                                    setNewBase({ ...newBase, name: base.name });
                                                    setShowBasesDropdown(false);
                                                }}
                                            >
                                                {base.name}
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
                                value={newBase.quantity}
                                onChange={(e) => setNewBase({ ...newBase, quantity: Number(e.target.value) })}
                                className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-800 font-medium mb-2 text-sm md:text-base">Price</label>
                            <input
                                type="number"
                                value={newBase.price}
                                onChange={(e) => setNewBase({ ...newBase, price: Number(e.target.value) })}
                                className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
                                placeholder="Enter price"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-transform duration-300 ease-in-out"
                        >
                            Add Base
                        </button>
                    </form>
                </div>


                {/* List Section */}
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold mb-6 text-white text-center">Bases List</h3>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : fetchError ? (
                        <p className="text-red-500 text-center">{fetchError}</p>
                    ) : bases.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bases.map((base) => (
                                <li
                                    key={base._id}
                                    className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-30 pointer-events-none"></div>
                                    <div className="relative z-10 flex flex-col space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-2xl font-bold text-white">{base.name}</h4>
                                            <span className="text-lg font-semibold text-yellow-300">{base.quantity} pcs</span>
                                        </div>
                                        <div className="flex items-center justify-between ">
                                            <span className="text-xl text-white">₹{base.price}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white text-center">No bases available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBases;
