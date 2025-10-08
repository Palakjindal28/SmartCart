import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Modal from './Modal';
import Chatbot from './Chatbot';

const Navbar = () => {
    const { cartItems, deliveryTimer, isTimerActive } = useContext(CartContext);
    const [isHelpModalOpen, setHelpModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(info);
    }, []);

    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const formatTime = () => {
        const minutes = Math.floor(deliveryTimer / 60);
        const seconds = deliveryTimer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-brand">SmartCart<span>🛒</span></Link>

                {isTimerActive && (
                    <div className="navbar-timer">
                        🛵 Arriving in: <strong>{formatTime()}</strong>
                    </div>
                )}

                <div className="nav-links">
                    {userInfo ? (
                        <>
                            <span className="nav-button">Hi {userInfo.name}!</span>
                            <button className="nav-button" onClick={() => {
                                localStorage.removeItem('userInfo');
                                setUserInfo(null);
                            }}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-button">Login</Link>
                    )}
                    <button onClick={() => setHelpModalOpen(true)} className="help-button">
                        Help & Support
                    </button>

                    <Link to="/cart" className="cart-button">
                        🛒 Cart
                        {totalItemCount > 0 && (
                            <span className="cart-count-badge">{totalItemCount}</span>
                        )}
                    </Link>
                </div>
            </nav>

            <Modal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}>
                <Chatbot />
            </Modal>
        </>
    );
};

export default Navbar;