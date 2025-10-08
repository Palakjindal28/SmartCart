import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

    const cartItem = cartItems.find(item => item._id === product._id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        addToCart(product); 
    };

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">₹{product.price}</p>
            
            {quantity === 0 ? (
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                    Add
                </button>
            ) : (
                <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(product._id)} className="quantity-btn">-</button>
                    <span className="quantity-text">{quantity}</span>
                    <button onClick={() => increaseQuantity(product._id)} className="quantity-btn">+</button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;