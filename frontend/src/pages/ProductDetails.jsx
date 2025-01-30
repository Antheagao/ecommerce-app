import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching product with ID:", id);

    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Product Data:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product || Object.keys(product).length === 0) return <h2>Product Not Found</h2>;

  return (
    <div className="product-details">
      <img 
        src={product.imageUrl || "https://via.placeholder.com/300"} 
        alt={product.name} 
        className="product-image" 
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>${product.price.toFixed(2)}</h3>
      <button className="add-to-cart" onClick={() => addToCart(product)}>🛒 Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
