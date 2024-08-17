// src/pages/OrdersPage.js
import React, { useEffect, useState } from 'react';
import { getAllPizza, updateOrderStatus } from '../utils/pizzaApi';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import dayjs from 'dayjs';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllPizza();
                setOrders(response);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching orders');
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const updatedOrder = await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order =>
                order._id === updatedOrder._id ? updatedOrder : order
            ));
        } catch (error) {
            setError(error.response?.data?.message || 'Error updating order status');
        }
    };

    const sortedOrders = [...orders].sort((a, b) => b._id.localeCompare(a._id));
    const filteredOrders = filter === 'all'
        ? sortedOrders
        : sortedOrders.filter(order =>
            filter === 'Pending' ? order.status === 'Pending' : order.status === 'Sent to delivery'
        );

    const headingText = filter === 'Pending'
        ? 'Pending Order Details'
        : filter === 'delivered'
            ? 'Sent to Delivery Order Details'
            : 'Order Details';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4 sm:p-6 md:p-8 lg:p-10">
            <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 sm:p-6 md:p-8 rounded-b-lg shadow-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center tracking-tight">Orders</h1>
            </header>
            <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto">
                    <div className='flex flex-col sm:flex-row justify-between items-start mb-6'>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{headingText}</h2>
                        <button
                            onClick={() => setFilter(filter === 'Pending' ? 'delivered' : 'Pending')}
                            className="mt-4 sm:mt-0 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow-lg hover:from-teal-500 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
                        >
                            {filter === 'Pending' ? 'Show Delivered Orders' : 'Show Pending Orders'}
                        </button>
                    </div>
                    {orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                                        <th className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg hidden md:table-cell">Order ID</th>
                                        <th className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg">Pizza Name</th>
                                        <th className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg hidden md:table-cell">Total</th>
                                        <th className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg">Status</th>
                                        <th className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg hidden md:table-cell">Order Date</th>
                                        <th className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-100 transition-all duration-300 lg:gap-4"
                                        >
                                            <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg hidden md:table-cell">{order._id}</td>
                                            <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg">{`${order.base} ${order.meat.toLowerCase()} pizza`}</td>
                                            <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg hidden md:table-cell">${order.price}</td>
                                            <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-white ${order.status === 'Pending'
                                                        ? 'bg-yellow-500'
                                                        : 'bg-green-500'
                                                        }`}
                                                >
                                                    {order.status === 'Pending' ? (
                                                        <AiOutlineCloseCircle className="mr-1 text-sm sm:text-base" />
                                                    ) : (
                                                        <AiOutlineCheckCircle className="mr-1 text-sm sm:text-base" />
                                                    )}
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg hidden md:table-cell">
                                                {dayjs(order.createdAt).format('MMM D, YYYY h:mm A')}
                                            </td>
                                            <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                                {order.status === 'Pending' && (
                                                    <button
                                                        onClick={() => handleStatusChange(order._id, 'Sent to delivery')}
                                                        className="px-2 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                                                    >
                                                        Mark as Sent
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-700 text-center">No orders found.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrdersPage;
