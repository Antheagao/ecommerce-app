package com.anthonymendez.ecommerce_app.repository;

import com.anthonymendez.ecommerce_app.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
