// src/middilaware/useAuth.js
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const BASE_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/users/status`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setIsAuthenticated(response.data.isAuthenticated);
          if (response.data.isAuthenticated) {
            const userProfile = await axios.get(`${BASE_URL}/users/profile`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            setIsAdmin(userProfile.data.isAdmin);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, loading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
