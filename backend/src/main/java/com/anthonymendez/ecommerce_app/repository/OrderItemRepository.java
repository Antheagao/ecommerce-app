package com.anthonymendez.ecommerce_app.repository;

import com.anthonymendez.ecommerce_app.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import com.anthonymendez.ecommerce_app.model.Order;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
}
