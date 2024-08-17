import React, { useState, useEffect } from 'react';
import SlidingBanner from '../components/SlidingBanner';
import PizzaCard from '../components/PizzaCard';
import { getAllPizza } from '../utils/pizzaApi';
import { CustomizeSection } from '../components/customizeOfferSection/CustomizeSection';
import ErrorPage from '../components/errorPage/ErrorPage';

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const fetchedPizzas = await getAllPizza();
        const recentPizzas = fetchedPizzas.slice(-4);
        setPizzas(recentPizzas);
      } catch (error) {
        setError('Failed to load pizzas');
      }
    };

    fetchPizzas();
  }, []);

  if (error) return <ErrorPage errorMessage={error} />;

  return (
    <div className="min-h-screen bg-white font-sans mt-20 p-">
      <SlidingBanner />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 relative">🔥
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text text-shadow-lg">
            Hot Picks
          </span>🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16">
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))}
        </div>
        <div className="mt-12">
          <CustomizeSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
