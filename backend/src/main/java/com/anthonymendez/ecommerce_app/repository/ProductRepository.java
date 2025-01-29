package com.anthonymendez.ecommerce_app.repository;

import com.anthonymendez.ecommerce_app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
