import React, { useEffect, useState } from 'react';
import { getPizzaByUserId } from '../utils/pizzaApi';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import Loader from '../components/loader/Loader';
import DashboardModal from '../components/dashboardModal/DashboardModal';
import { Link } from "react-router-dom"
import ErrorPage from '../components/errorPage/ErrorPage';

const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const pizzas = await getPizzaByUserId();
                setOrders(pizzas);
            } catch (error) {
                setError('Failed to load pizzas');
            }
        };
        fetchPizzas();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loader />;
    if (error) return <ErrorPage errorMessage={error} />;

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
        <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
            <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 sm:p-6 rounded-b-lg shadow-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center tracking-tight">
                    Your Pizza Dashboard
                </h1>
            </header>
            <main className="flex-1 p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4'>
                        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">
                            {headingText}
                        </h2>
                        <button
                            onClick={() => setFilter(filter === 'Pending' ? 'delivered' : 'Pending')}
                            className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow-lg hover:from-teal-500 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                        >
                            {filter === 'Pending' ? 'Show Delivered Orders' : 'Show Pending Orders'}
                        </button>
                    </div>
                    {orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm sm:text-base">
                                        <th className="py-4 px-6 text-left">Pizza Name</th>
                                        <th className="py-4 px-6 text-left hidden md:table-cell">Order ID</th>
                                        <th className="py-4 px-6 text-left hidden lg:table-cell">Total</th>
                                        <th className="py-4 px-6 text-left hidden lg:table-cell">Status</th>
                                        <th className="py-4 px-6 text-left hidden lg:table-cell">Order Date</th>
                                        <th className="py-4 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
                                        >
                                            <td className="py-4 px-6 font-medium text-gray-800">{`${order.base} ${order.meat.toLowerCase()} pizza`}</td>
                                            <td className="py-4 px-6 hidden md:table-cell">{order._id}</td>
                                            <td className="py-4 px-6 hidden lg:table-cell">${order.price}</td>
                                            <td className="py-4 px-6 hidden lg:table-cell">
                                                {order.status === 'Pending' ? (
                                                    <span className="text-yellow-600 font-bold">Pending</span>
                                                ) : (
                                                    <span className="text-green-600 font-bold">Sent to delivery</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 hidden lg:table-cell">{dayjs(order.createdAt).format('MMMM D, YYYY h:mm A')}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className={`px-4 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm bg-blue-500 text-white hover:bg-blue-600`}
                                                >
                                                    View Details
                                                </button>
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
            {selectedOrder && (
                <DashboardModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    );
};

export default DashboardPage;
