import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isAuthenticated, setIsAuthenticated, cartItems = [], removeFromCart }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsAuthenticated(false); // Update auth state
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="home-icon">🏠</Link>
        </div>

        <div className="nav-center">
          <input type="text" className="search-bar" placeholder="Search..." />
          <button className="search-button">🔍</button>
        </div>

        <div className="nav-right">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
          {/* Cart Icon with Click Handler */}
          <div className="nav-cart" onClick={() => setIsCartOpen(!isCartOpen)}>
            🛒
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </div>
        </div>
      </nav>

      {/* Pop-Out Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <button className="close-cart" onClick={() => setIsCartOpen(false)}>✖</button>
        <h2>🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => removeFromCart(item)}>❌</button>
              <Link to="/checkout" className="checkout-link">Proceed to Checkout</Link>
            </div>
          ))
        )}
      </div>
      {/* Overlay (Click to Close) */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
    </>
  );
}

export default Navbar;
