import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                email,
                password,
            });
            console.log('Login successful:', response.data);

            localStorage.setItem('userInfo', JSON.stringify({
                name: response.data.name,
                email: response.data.email,
                token: response.data.token
            }));

            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-form-container">
                <h2>Login to SmartCart</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="signup-link">
                    New to SmartCart? <Link to="/signup">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;