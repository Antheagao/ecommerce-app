package com.anthonymendez.ecommerce_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disable CSRF for simplicity (not recommended for production)
            .authorizeHttpRequests()
            .requestMatchers("/api/users/**").permitAll() // Allow unauthenticated access to `/api/users`
            .anyRequest().authenticated() // Require authentication for all other endpoints
            .and()
            .httpBasic(); // Use HTTP Basic Authentication for secured endpoints (optional)

        return http.build();
    }
}
