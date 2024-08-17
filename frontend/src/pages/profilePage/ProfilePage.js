import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaSignOutAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.';
import Img1 from "../../utils/images/Pizza-Base-5.jpg";
import { getUserProfile } from "../../utils/authApi";
import Loader from "../../components/loader/Loader";
import ErrorPage from '../../components/errorPage/ErrorPage';
import "./ProfilePage.css";

const Profile = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response);
      } catch (error) {
        setError('Failed to fetch user profile');
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage errorMessage={error} />;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <div className="profile-page-container">
      <div className="profile-background"></div>
      <div className="profile-content mt-20">
        <h1 className="profile-header text-glow">Your Profile</h1>
        {user ? (
          <div className="glassmorphism-card w-full max-w-md p-6 md:p-8 rounded-3xl shadow-lg animate-fade-in">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 md:w-36 md:h-36 mb-6 overflow-hidden">
                <img 
                  src={user.profilePicture || Img1} 
                  alt="Profile" 
                  className="w-full h-full rounded-full border-4 border-indigo-500 object-cover"
                />
              </div>
              <div className="flex items-center mb-4">
                <FaUser className="text-3xl md:text-4xl text-indigo-400 mr-4" />
                <h2 className="text-xl md:text-2xl font-semibold text-black">{user.name}</h2>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-xl md:text-2xl text-indigo-400 mr-4" />
                <p className="text-base md:text-lg text-black">{user.email}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-xl md:text-2xl text-indigo-400 mr-4" />
                <p className="text-base md:text-lg text-black">{user.address || 'Kolkata, West-Bengal'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-teal-500 to-yellow-500 text-white px-6 py-3 rounded-full hover:scale-105 transform transition-transform duration-300 shadow-xl flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <p className="text-lg">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
