package com.anthonymendez.ecommerce_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication
@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class})
public class EcommerceAppApplication {

	public static void main(String[] args) {
		System.out.println("Starting E-commerce Application...");
		SpringApplication.run(EcommerceAppApplication.class, args);
	}

}
