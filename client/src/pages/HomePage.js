import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero'; 

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Products');

    const categories = [
        'All Products', 
        'Fruits & Vegetables', 
        'Dairy & Bakery', 
        'Snacks & Beverages', 
        'Household Items'
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `${process.env.REACT_APP_API_URL}/api/products`;
                if (selectedCategory !== 'All Products') {
                    url += `?category=${encodeURIComponent(selectedCategory)}`;
                }
                const { data } = await axios.get(url);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [selectedCategory]); 

    return (
        <div>
            <Hero />
            <div className="page-container">
                <div className="category-filters">
                    {categories.map(category => (
                        <button 
                            key={category}
                            className={selectedCategory === category ? 'active' : ''}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;