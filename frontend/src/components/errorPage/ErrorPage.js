import React from 'react';
import { Link } from 'react-router-dom';
import { FaPizzaSlice } from 'react-icons/fa';
import './ErrorPage.css';

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className="pizza-error-page-container">
      <div className="pizza-error-background">
        <div className="floating-pizza-slice"></div>
        <div className="floating-pizza-slice delay-1"></div>
        <div className="floating-pizza-slice delay-2"></div>
        <div className="floating-tomato"></div>
        <div className="floating-tomato delay-3"></div>
      </div>
      <div className="pizza-error-page-content">
        <FaPizzaSlice className="pizza-error-icon" />
        <h1 className="pizza-error-title">Oh no! A Slice Went Missing!</h1>
        <p className="pizza-error-message">{errorMessage}</p>
        <Link to="/" className="pizza-error-button">
          Go Back to Safety <FaPizzaSlice className="inline ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
