import React, { useState, useEffect, useContext } from 'react'; // 1. Add useState back
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// 2. Add the delivery partners array back
const deliveryPartners = ['Rohan', 'Priya', 'Amit', 'Sunita', 'Vikram'];

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const { clearCart, startDeliveryTimer } = useContext(CartContext);
    
    // 3. Add state for the status and partner name
    const [status, setStatus] = useState('Assigning a delivery partner...');
    const [partner, setPartner] = useState(null);

    useEffect(() => {
        clearCart();
        startDeliveryTimer();

        // 4. Add the timeout to simulate assigning a partner
        const partnerTimer = setTimeout(() => {
            const randomPartner = deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];
            setPartner(randomPartner);
            setStatus('Delivery partner assigned!');
        }, 4000); // Assigns after 4 seconds

        // Redirect back to the homepage after 7 seconds
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 7000);

        // Cleanup timers
        return () => {
            clearTimeout(partnerTimer);
            clearTimeout(redirectTimer);
        };
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>✅ Payment Successful!</h2>
            <p>Your order is on its way. You will be redirected shortly.</p>
            <hr style={{maxWidth: '400px', margin: '30px auto', border: 'none', borderTop: '1px solid #eee'}} />
            
            {/* 5. Display the status and partner name */}
            <h3>{status}</h3>
            {partner && <p style={{fontSize: '1.2rem'}}><strong>{partner}</strong> will be delivering your order.</p>}
        </div>
    );
};

export default PaymentSuccessPage;