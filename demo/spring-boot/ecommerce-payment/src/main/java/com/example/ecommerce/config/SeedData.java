package com.example.ecommerce.config;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;

@Component
public class SeedData implements CommandLineRunner {
    final UserRepository users;
    final ProductRepository products;
    final PasswordEncoder passwords;
    final String email;
    final String password;

    public SeedData(UserRepository u, ProductRepository p, PasswordEncoder e, @Value("${app.admin.email}") String email, @Value("${app.admin.password}") String password) {
        users = u;
        products = p;
        passwords = e;
        this.email = email;
        this.password = password;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (users.findByEmail(email).isEmpty()) {
            User u = new User();
            u.name = "Store administrator";
            u.email = email;
            u.passwordHash = passwords.encode(password);
            u.role = "ADMIN";
            u.createdAt = java.time.Instant.now();
            users.save(u);
        }
        if (products.count() == 0) {
            add("FF-L01", "Arc table lamp",
                    "A warm pool of light, a sculptural silhouette. Powder-coated steel meets a softly diffused glow. A thoughtful companion for the bedside or a quiet reading corner.",
                    "Living", 349900, 24, "lamp");
            add("FF-C01", "Everyday lounge chair",
                    "A generous seat and beautifully simple lines. Crafted with a solid oak frame and a durable woven seat for everyday moments of pause.",
                    "Living", 1299900, 8, "chair");
            add("FF-V01", "Still ceramic vase",
                    "Hand-finished stoneware in a quiet terracotta glaze. Beautiful with a single stem, equally considered on its own. Each piece carries small, natural variations.",
                    "Objects", 149900, 32, "vase");
            add("FF-B01", "The weekend tote",
                    "Carry a little less, go a little further. Heavyweight cotton canvas, generous handles and an inside pocket that keeps the small things close.",
                    "Everyday", 189900, 40, "bag");
            add("FF-H01", "Studio wireless headphones",
                    "Find your focus. Cushioned over-ear listening with a balanced sound, intuitive controls and up to 30 hours of battery life.", "Technology",
                    599900, 18, "headphones");
            add("FF-K01", "Moment wall clock",
                    "Make room for a slower rhythm. A silent movement, an uncluttered face and a natural wood rim bring a little calm to the everyday.",
                    "Objects", 249900, 16, "clock");
        }
    }

    void add(String sku, String title, String description, String category, long price, int stock, String art) {
        Product p = new Product();
        p.sku = sku;
        p.title = title;
        p.description = description;
        p.category = category;
        p.priceMinorUnits = price;
        p.stockQuantity = stock;
        p.active = true;
        p.art = art;
        products.save(p);
    }
}
