import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl || "https://via.placeholder.com/200"} alt={product.name} className="product-image" />
      </Link>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <Link to={`/product/${product.id}`} className="details-button">View Details</Link>
      <button className="add-to-cart" onClick={() => addToCart(product)}>
        🛒 Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
