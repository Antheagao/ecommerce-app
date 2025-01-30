import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Invalid API response format:", data);
          setError("Unexpected data format from API");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-message">Loading products...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
