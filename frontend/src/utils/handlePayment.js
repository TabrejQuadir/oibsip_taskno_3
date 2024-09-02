import axios from 'axios';

const handlePayment = async (selection, confirmOrder) => {
    try {
        const response = await axios.post('https://oasis-infobyte-backend.onrender.com/api/payment/order', {
            amount: selection.price,
            currency: 'INR'
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        const orderData = response.data;
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'PIZZA_HUB',
            description: 'Pizza Order',
            order_id: orderData.id,
            handler: function (response) {
                console.log('Payment successful:', response);
                confirmOrder();
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#008080'
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
    }
};

export default handlePayment;
