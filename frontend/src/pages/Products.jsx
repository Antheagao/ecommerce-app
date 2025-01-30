import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState(""); // Sorting option
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle Category Change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle Sorting Change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Handle Price Filtering
  const handlePriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Apply Filters & Sorting
  useEffect(() => {
    let filtered = [...products];

    // Filter by Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by Price
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    // Sorting Logic
    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortOrder, maxPrice, products]);

  return (
    <div className="products-page">
      <h2>Products</h2>

      {/* Filters & Sorting */}
      <div className="filters">
        <select onChange={handleCategoryChange} value={selectedCategory}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handlePriceChange}
        />
      </div>

      {/* Product Listing */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
