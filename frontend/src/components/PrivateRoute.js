import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.';

const PrivateRoute = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth();
    console.log(isAuthenticated, "isAuthenticated")

    if (isLoading) {
        // You can render a loading spinner or some placeholder here
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default PrivateRoute;
