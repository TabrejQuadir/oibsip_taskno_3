import axios from 'axios';

const API_URL = 'https://oasis-infobyte-backend.onrender.com/api/users';
const ADMIN_URL = "https://oasis-infobyte-admin.onrender.com"

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}`, userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); 
        }
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data.token) {
            console.log("Token received:", response.data.token); // Log token for debugging
            localStorage.setItem('token', response.data.token); // Save token to localStorage
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password?frontendUrl=${ADMIN_URL}`, { email });
        return response.data;
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        throw error;
    }
};

export const resetPassword = async (password) => {
    try {
        const response = await axios.put(`${API_URL}/reset-password`, { password });
        return response.data;
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile', error);
        throw error;
    }
}

