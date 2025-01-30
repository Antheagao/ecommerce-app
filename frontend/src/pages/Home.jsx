import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import './Home.css';

function Home({ addToCart }) { 
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to E-Commerce Shop</h1>
        <p>Discover the latest products.</p>
        <Link to="/products" className="shop-now-btn">🛍️ Shop Now</Link>
      </section>

      {/* Display Products */}
      <section className="featured-products">
        <h2>🔥 Featured Products</h2>
        <ProductList addToCart={addToCart} />
      </section>
    </div>
  );
}

export default Home;
