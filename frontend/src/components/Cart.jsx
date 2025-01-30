import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart({ cartItems, setCartItems }) {
  const [total, setTotal] = useState(0);

  // Ensure cartItems is always an array
  const safeCartItems = cartItems || [];

  // Calculate total price
  useEffect(() => {
    setTotal(safeCartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0));
  }, [safeCartItems]);

  // Remove item from cart
  const removeFromCart = (item) => {
    const updatedCart = safeCartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (item) => {
    const updatedCart = safeCartItems.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (item) => {
    const updatedCart = safeCartItems.map(cartItem =>
      cartItem.id === item.id && (cartItem.quantity || 1) > 1
        ? { ...cartItem, quantity: (cartItem.quantity || 1) - 1 }
        : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Load cart from local storage once on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);  // ✅ Fix: Only runs once

  return (
    <div className="cart-container">
      <h2>🛒 Shopping Cart</h2>
      {safeCartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {safeCartItems.map((item, index) => (  // ✅ Fix: Unique key
            <div key={`${item.id}-${index}`} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span>{item.quantity || 1}</span>  {/* ✅ Fix: Ensure quantity exists */}
                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item)}>❌</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
