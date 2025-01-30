import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const total = (cartItems && cartItems.length > 0) 
  ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) 
  : 0;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    setCartItems([]); // Clear cart after checkout
    localStorage.removeItem("cart"); // Remove from local storage
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <span>{item.name}</span>
              <span>${item.price} x {item.quantity}</span>
            </div>
          ))
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit" className="checkout-button">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
