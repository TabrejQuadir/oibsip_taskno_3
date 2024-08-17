// src/components/Layout.js
import React from 'react';
import Navbar from './navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/register', '/admin'];
    const hideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <div>
            {!hideNavbar && <Navbar />}
            <Outlet />
        </div>
    );
};

export default Layout;
