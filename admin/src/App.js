import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ManageBases from './pages/ManageBases';
import ManageSauces from './pages/ManageSauces';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import ManageCheese from './pages/ManageCheese';
import ManageVeggies from './pages/ManageVeggies';
import ManageMeats from './pages/ManageMeats';
import Layout from './components/Layout'; 
import OrdersPage from './pages/OrdersPage';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/admin" />} />

                {/* Routes without Navbar */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route
                    path="/admin"
                    element={<ProtectedRoute adminRequired={true} element={AdminDashboard} />}
                />
                {/* Routes with Navbar */}
                <Route element={<Layout />}>
                 <Route 
                  path="/admin/orders" element={<ProtectedRoute adminRequired={true} element={OrdersPage} />}
                />
                    <Route
                        path="/admin/bases"
                        element={<ProtectedRoute adminRequired={true} element={ManageBases} />}
                    />
                    <Route
                        path="/admin/sauces"
                        element={<ProtectedRoute adminRequired={true} element={ManageSauces} />}
                    />
                    <Route
                        path="/admin/cheeses"
                        element={<ProtectedRoute adminRequired={true} element={ManageCheese} />}
                    />
                    <Route
                        path="/admin/veggies"
                        element={<ProtectedRoute adminRequired={true} element={ManageVeggies} />}
                    />
                    <Route
                        path="/admin/meats"
                        element={<ProtectedRoute adminRequired={true} element={ManageMeats} />}
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
