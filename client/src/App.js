import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import CartPage from './pages/CartPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import HomePage from './pages/HomePage'; // <-- 1. IMPORT HOMEPAGE
import './App.css'; // <-- 2. IMPORT THE CSS FILE
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} /> {/* 2. Add the new route */}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
            </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;