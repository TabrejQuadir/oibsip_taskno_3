import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import DashboardPage from './pages/DashboardPage';
import CustomPizzaPage from './pages/customPizza/CustomPizzaPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/profilePage/ProfilePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ForgotPasswordPage from './pages/Forgot Password';
import ResetPasswordPage from './pages/Reset Password';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
                <Route path="/customize" element={<PrivateRoute element={<CustomPizzaPage />} />} />
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
