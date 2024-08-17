import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCheese, getCheeses } from '../utils/pizzaApi';

const ManageCheese = () => {
    const [cheeses, setCheeses] = useState([]);
    const [newCheese, setNewCheese] = useState({ name: '', quantity: '' });
    const [errors, setErrors] = useState({ name: '', quantity: '' });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchCheeses = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const result = await getCheeses();
                setCheeses(result || []);
                setFetchError(null);
            } catch (error) {
                console.error('Error fetching cheeses:', error);
                setFetchError('Error fetching cheeses. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchCheeses();
    }, []);

    const validateFields = () => {
        const newErrors = { name: '', quantity: '' };
        if (!newCheese.name.trim()) {
            newErrors.name = 'Cheese name is required.';
        }
        if (!newCheese.quantity || newCheese.quantity <= 0) {
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
            await addCheese(newCheese);
            setNewCheese({ name: '', quantity: '' });
            const result = await getCheeses();
            setCheeses(result || []);
            toast.success('Cheese added successfully!', { autoClose: 3000 });
        } catch (error) {
            toast.error('Error adding cheese. Please try again.', { autoClose: 3000 });
            console.error('Error adding cheese:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            <ToastContainer />
            <div className="bg-yellow-600 text-white py-4 px-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Manage Cheeses</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form Section */}
                <div className="bg-gradient-to-br from-[#f9f9f9] via-[#f7e4a6] to-[#ffffff] p-8 rounded-xl shadow-lg border-2 border-yellow-400">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-900 text-center tracking-tight">Add New Cheese</h3>
                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 md:space-y-8">
                        <div className="relative">
                            <label className="block text-gray-800 font-medium mb-2 text-sm md:text-base">Cheese Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={newCheese.name}
                                    onChange={(e) => setNewCheese({ ...newCheese, name: e.target.value })}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-400'}`}
                                    placeholder="Enter or select cheese name"
                                />
                                <FaCaretDown
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer transition-transform duration-300 hover:text-yellow-500"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-xl mt-1 max-h-48 overflow-auto transition-opacity duration-300 ease-in-out">
                                        {cheeses.map((cheese) => (
                                            <li
                                                key={cheese._id}
                                                className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => {
                                                    setNewCheese({ ...newCheese, name: cheese.name });
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                {cheese.name}
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
                                value={newCheese.quantity}
                                onChange={(e) => setNewCheese({ ...newCheese, quantity: Number(e.target.value) })}
                                className={`w-full px-4 py-3 border-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out ${errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-400'}`}
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-transform duration-300 ease-in-out"
                        >
                            Add Cheese
                        </button>
                    </form>
                </div>


                {/* List Section */}
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold mb-6 text-white text-center">Cheeses List</h3>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : fetchError ? (
                        <p className="text-red-500 text-center">{fetchError}</p>
                    ) : cheeses.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cheeses.map((cheese) => (
                                <li
                                    key={cheese._id}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-30 pointer-events-none"></div>
                                    <div className="relative z-10 flex flex-col space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-2xl font-bold text-white">{cheese.name}</h4>
                                            <span className="text-lg font-semibold text-white">{cheese.quantity} pcs</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-yellow-300 text-center">No cheese available. Add a cheese to view it here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCheese;
