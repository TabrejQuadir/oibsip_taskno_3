import React from 'react';
import logo from '../../utils/images/Logo.png'; 
import "./Loader.css"

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-400 to-yellow-300">
      <div className="spinner">
        <div className="spinner-border"></div>
        <img src={logo} alt="Logo" className="logo"/>
      </div>
    </div>
  );
};


export default Loader;