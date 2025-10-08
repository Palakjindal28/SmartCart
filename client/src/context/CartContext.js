import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [deliveryTimer, setDeliveryTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    useEffect(() => {
        if (!isTimerActive) return;

        const interval = setInterval(() => {
            setDeliveryTimer(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    setIsTimerActive(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerActive]);

    const startDeliveryTimer = () => {
        setDeliveryTimer(10 * 60);
        setIsTimerActive(true);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const increaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            deliveryTimer,
            isTimerActive,
            startDeliveryTimer,
            isPaymentSuccessful,
            setIsPaymentSuccessful,
        }}>
            {children}
        </CartContext.Provider>
    );
};