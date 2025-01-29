import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="nav-left">
        <Link to="/" className="home-icon"> 
          🏠
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="nav-center">
        <input type="text" className="search-bar" placeholder="Search products..." />
        <button className="search-button">🔍</button>
      </div>

      {/* Right: Login & Cart */}
      <div className="nav-right">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/cart" className="nav-cart">
          🛒
          <span className="cart-count">2</span> 
        </Link> 
      </div>
    </nav>
  );
}

export default Navbar;
