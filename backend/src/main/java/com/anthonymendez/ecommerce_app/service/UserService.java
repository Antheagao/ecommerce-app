package com.anthonymendez.ecommerce_app.service;

import com.anthonymendez.ecommerce_app.model.User;
import com.anthonymendez.ecommerce_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // **Register a new user**
    public User registerUser(String username, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        // Check if email already exists
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Email already exists");
        }

        // **Use setters instead of constructor**
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));

        return userRepository.save(user);
    }

    // **Login user**
    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        // Check if user exists and password is correct
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPasswordHash())) {
            return user;
        }

        return Optional.empty();
    }
}
