// src/utils/pizzaApi.js
import axios from 'axios';

const API_URL = 'https://oasis-infobyte-backend.onrender.com/api';

const apiRequest = async (method, endpoint, data = null) => {
    try {
        const config = {
            method,
            url: `${API_URL}${endpoint}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
                'Content-Type': 'application/json'
            },
        };

        if (data) {
            config.data = data;
        }

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`Error with ${method} request to ${endpoint}:`, error);
        throw error;
    }
};

export const addBase = (newBase) => apiRequest('POST', '/bases', newBase);
export const getBases = () => apiRequest('GET', '/bases');
export const addSauce = (newSauce) => apiRequest('POST', '/sauces', newSauce);
export const getSauces = () => apiRequest('GET', '/sauces');
export const addCheese = (newCheese) => apiRequest('POST', '/cheeses', newCheese);
export const getCheeses = () => apiRequest('GET', '/cheeses');
export const addVeggie = (newVeggie) => apiRequest('POST', '/veggies', newVeggie);
export const getVeggies = () => apiRequest('GET', '/veggies');
export const addMeat = (newMeat) => apiRequest('POST', '/meats', newMeat);
export const getMeats = () => apiRequest('GET', '/meats');
export const addPizza = (newOrder) => apiRequest('POST', '/pizzas/add', newOrder);
export const getAllPizza = () => apiRequest('GET', '/pizzas/getAllPizza');
export const updateOrderStatus = (orderId, status) => apiRequest('PUT', `/pizzas/updateStatus/${orderId}`, { status });
