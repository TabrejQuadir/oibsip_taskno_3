import axios from 'axios';
const API_URL = 'https://oasis-infobyte-backend.onrender.com/api';

export const getBases = async () => {
    try {
        const response = await axios.get(`${API_URL}/bases`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching bases:', error);
        throw error;
    }
};

export const getSauces = async () => {
    try {
        const response = await axios.get(`${API_URL}/sauces`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sauces:', error);
        throw error;
    }
};

export const getCheeses = async () => {
    try {
        const response = await axios.get(`${API_URL}/cheeses`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cheeses:', error);
        throw error;
    }
};

export const getVeggies = async () => {
    try {
        const response = await axios.get(`${API_URL}/veggies`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching veggies:', error);
        throw error;
    }
};

export const getMeats = async () => {
    try {
        const response = await axios.get(`${API_URL}/meats`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching meats:', error);
        throw error;
    }
};

export const addPizza = async (newOrder) => {
    try {
        const response = await fetch('http://localhost:5000/api/pizzas/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newOrder),
        });
        if (!response.ok) {
            throw new Error('Failed to add pizza');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding pizza:', error);
        throw error;
    }
};

export const getPizzaByUserId = async () => {
    try {
        const response = await fetch(`${API_URL}/pizzas/getPizzasByUserId`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.status === 404) {
            // Handle the case where no pizzas are found
            return []; 
        } else if (!response.ok) {
            throw new Error(`Failed to fetch pizzas: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching pizzas:', error);
        throw error;
    }
};


export const getAllPizza = async () => {
    try {
        const response = await fetch(`${API_URL}/pizzas/getAllPizza`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch pizzas: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched pizzas data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching pizzas:', error);
        throw error;
    }
};
