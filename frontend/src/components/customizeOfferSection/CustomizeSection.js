import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CustomizeSection.css';

const messages = [
  {
    heading: 'Customize Your Own Pizza 🍕',
    slogan: 'Choose your favorite ingredients and create a pizza just the way you like it!',
  },
  {
    heading: 'Create Your Dream Pizza 😋',
    slogan: 'Add your favorite toppings and make your pizza unique!',
  },
  {
    heading: 'Personalize Your Pizza 🍽️',
    slogan: 'Make a pizza that perfectly matches your taste buds!',
  },
];

export const CustomizeSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="customize-section">
      <div className="bg-animated"></div>
      <img
        src="https://as2.ftcdn.net/v2/jpg/06/77/46/87/1000_F_677468785_hbZRVvo8oFrUWZEEtkBSaLtWOgFKUuze.webp"
        alt="Pizza Left"
        className="pizza-image pizza-image-left"
      />
      <img
        src="https://as1.ftcdn.net/v2/jpg/06/73/73/50/1000_F_673735029_Mo4rGPMVacGd8jzcNSXo8JKNcMueWoao.webp"
        alt="Pizza Right"
        className="pizza-image pizza-image-right"
      />

      <div className="text-container">
        <h3 className={`heading animate-slide-in`} key={`heading-${index}`}>
          {messages[index].heading}
        </h3>
        <p className={`slogan animate-slogan-in`} key={`slogan-${index}`}>
          {messages[index].slogan}
        </p>
        <Link to="/customize" className="customize-button">
          Start Customizing 🍽️
        </Link>
      </div>
    </div>
  );
};
