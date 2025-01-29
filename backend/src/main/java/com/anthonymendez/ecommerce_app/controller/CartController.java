package com.anthonymendez.ecommerce_app.controller;

import com.anthonymendez.ecommerce_app.model.Cart;
import com.anthonymendez.ecommerce_app.repository.CartRepository;
import com.anthonymendez.ecommerce_app.repository.ProductRepository;
import com.anthonymendez.ecommerce_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // Get all cart items
    @GetMapping
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    // Get a cart item by ID
    @GetMapping("/{id}")
    public Cart getCartItemById(@PathVariable Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    // Add a new item to the cart
    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        return cartRepository.save(cart);
    }

    // Update quantity of a cart item
    @PutMapping("/{id}")
    public Cart updateCartItem(@PathVariable Long id, @RequestBody Cart cartDetails) {
        return cartRepository.findById(id).map(cart -> {
            cart.setQuantity(cartDetails.getQuantity());
            return cartRepository.save(cart);
        }).orElse(null);
    }

    // Remove an item from the cart
    @DeleteMapping("/{id}")
    public void removeCartItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }
}
