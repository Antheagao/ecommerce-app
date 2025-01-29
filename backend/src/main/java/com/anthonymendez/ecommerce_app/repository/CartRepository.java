package com.anthonymendez.ecommerce_app.repository;

import com.anthonymendez.ecommerce_app.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import com.anthonymendez.ecommerce_app.model.Order;

public interface CartRepository extends JpaRepository<Cart, Long> {
    
}
