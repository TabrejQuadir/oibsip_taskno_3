import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({ element: Element, adminRequired = false, ...rest }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (adminRequired && !isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return <Element {...rest} />;
};

export default ProtectedRoute;
