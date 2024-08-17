import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import handlePayment from '../../utils/handlePayment';
import "./CustomPizzaModal.css";

Modal.setAppElement('#root');

const CustomPizzaModal = ({ isOpen, onRequestClose, selection, veggies, pizzaImage, confirmOrder, closing, setClosing }) => {
    const [isLoading, setIsLoading] = useState(false);

    const initiatePayment = async () => {
        setIsLoading(true);  
        try {
            await handlePayment(selection, confirmOrder);
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={`modal-container ${closing ? 'modal-container-exit' : ''}`}
            overlayClassName="modal-overlay"
            onAfterClose={() => setClosing(false)}
        >
            <div className="modal-content">
                <button onClick={onRequestClose} className="modal-close-button">
                    <FaTimes />
                </button>
                <h2 className="modal-title">
                    Confirm Your Order
                </h2>
                <div className="modal-image-container">
                    <img src={pizzaImage} alt="Pizza Base" className="modal-image" />
                </div>
                <div className="modal-details">
                    <p className="modal-detail-item">Base: {selection.base}</p>
                    <p className="modal-detail-item">Sauce: {selection.sauce}</p>
                    <p className="modal-detail-item">Cheese: {selection.cheese}</p>
                    <p className="modal-detail-item">Meat: {selection.meat}</p>
                    <p className="modal-detail-item">Veggies: {veggies?.join(', ')}</p>
                    <p className="text-cyan-400 font-bold ">Total Price:
                        <span className='modal-price text-red-500'> ${selection.price?.toFixed(2)}</span>
                    </p>
                </div>
                <button
                    onClick={initiatePayment}
                    className="modal-confirm-button"
                    disabled={isLoading}  
                >
                    {isLoading ? (
                        <div className="loading-spinner"></div>  
                    ) : (
                        'Pay with Razorpay'
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default CustomPizzaModal;
