import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/users/status', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setIsAuthenticated(response.data.isAuthenticated);
                    console.log("Auth status checked, isAuthenticated:", response.data.isAuthenticated);
                } catch (error) {
                    setIsAuthenticated(false);
                    console.log("Error checking auth status:", error);
                }
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
