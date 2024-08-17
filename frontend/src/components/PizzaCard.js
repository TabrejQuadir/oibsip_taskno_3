import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import smallBaseImage from '../utils/images/Pizza-Base-1.jpg';
import mediumBaseImage from '../utils/images/Pizza-Base-2.jpg';
import largeBaseImage from '../utils/images/Pizza-Base-3.jpg';
import premiumBaseImage from '../utils/images/Pizza-Base-4.jpg';
import classicBaseImage from '../utils/images/Pizza-Base-5.jpg';
import CustomPizzaModal from '../components/customPizzaModal/CustomPizzaModal';
import { addPizza } from '../utils/pizzaApi';
import { getUserProfile } from '../utils/authApi';
import { useOrders } from '../context/OrderContext';

const baseImages = {
  small: smallBaseImage,
  medium: mediumBaseImage,
  large: largeBaseImage,
  premium: premiumBaseImage,
  classic: classicBaseImage,
};

const PizzaCard = ({ pizza }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setClosing(true);
    setTimeout(() => setIsModalOpen(false), 300);
  };
  const { addOrder } = useOrders();

  const confirmOrder = async () => {
    const { base, sauce, cheese, meat, veggies, price } = pizza;
    try {
      const userProfile = await getUserProfile();
      const userId = userProfile._id;
      const newOrder = {
        base,
        sauce,
        cheese,
        meat,
        veggies,
        price,
        status: 'Pending',
        user: userId
      };
      await addPizza(newOrder);
      addOrder(newOrder);
      handleCloseModal();
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    } catch (error) {
      alert('Failed to add pizza. Please try again.');
    }
  };

  const baseImage = baseImages[pizza.base.toLowerCase()] || 'path/to/default_image.png';

  return (
    <div>
   <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 border border-transparent rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-translate-y-3">
  <div className="relative overflow-hidden rounded-t-3xl">
    <img
      src={baseImage}
      alt={pizza.base}
      className="w-full h-56 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 hover:rotate-3 hover:brightness-105"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-red-500 text-white text-xs px-4 py-1.5 rounded-full shadow-xl transform transition-transform duration-300 hover:scale-110">
      Best Seller
    </div>
  </div>
  <div className="p-6 bg-white bg-opacity-80 backdrop-blur-md rounded-b-3xl relative z-10">
    <h3 className="text-xl sm:text-xl md:text-lg lg:text-2xl font-extrabold mb-2 text-gray-900 text-shadow-lg tracking-tight">
      {`${pizza.base} ${pizza.meat.toLowerCase()} Pizza`}
    </h3>

    <p className="text-gray-700 mb-4 text-sm md:text-base lg:text-lg leading-relaxed tracking-wide text-shadow">
      {pizza.veggies.join(', ')}
    </p>
    <div className="flex justify-between items-center">
      <span className="text-red-600 font-bold text-lg lg:text-xl">
        ${pizza.price}
      </span>
      <button
        onClick={handleViewDetails}
        className="bg-gradient-to-r from-purple-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-2xl"
      >
        Order Now
      </button>
    </div>
  </div>
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute bottom-0 right-0 w-44 h-44 bg-gradient-to-tr from-pink-300 to-purple-300 opacity-60 rounded-full blur-3xl transform translate-x-16 translate-y-12"></div>
    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-300 to-yellow-300 opacity-60 rounded-full blur-3xl transform -translate-x-10 -translate-y-10"></div>
  </div>
</div>


      {isModalOpen && (
        <CustomPizzaModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          selection={pizza}
          veggies={pizza.veggies}
          pizzaImage={baseImage}
          confirmOrder={confirmOrder}
          closing={closing}
          setClosing={setClosing}
        />
      )}
    </div>
  );
};

export default PizzaCard;
