import React, { useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {

    const { cartItems, setIsPaymentSuccessful, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/order`, { amount: totalAmount });
        if (!result) {
            alert('Server error. Please try again.');
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: amount.toString(),
            currency: currency,
            name: 'SmartCart Inc.',
            description: 'Grocery Transaction',
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };
                const verificationResult = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/verify`, data);
                if (verificationResult.data.status === 'success') {
                    setIsPaymentSuccessful(true);
                    navigate('/payment-success');
                } else {
                    alert('Payment verification failed.');
                }
            },
            prefill: { name: 'Your Name', email: 'your.email@example.com', contact: '9999999999' },
            theme: { color: '#3399cc' },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div className="page-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p>Price: ₹{item.price}</p>
                                    {/* Add quantity controls here */}
                                    <div className="quantity-control-cart">
                                        <button onClick={() => decreaseQuantity(item._id)} className="quantity-btn">-</button>
                                        <span className="quantity-text">{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item._id)} className="quantity-btn">+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="cart-total">
                            <span>Total</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckout} className="checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;