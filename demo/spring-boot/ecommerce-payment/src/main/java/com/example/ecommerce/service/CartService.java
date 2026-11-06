package com.example.ecommerce.service;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class CartService {
    private final CartItemRepository carts;
    private final ProductRepository products;
    private final UserRepository users;

    public CartService(CartItemRepository c, ProductRepository p, UserRepository u) {
        carts = c;
        products = p;
        users = u;
    }

    public record Line(Product product, int quantity, long subtotal) {
        public Product getProduct() {
            return product;
        }

        public int getQuantity() {
            return quantity;
        }

        public String getMoney() {
            return Money.format(subtotal);
        }
    }
    public record Cart(List<Line> lines, long total, int count) {
        public List<Line> getLines() {
            return lines;
        }

        public long getTotal() {
            return total;
        }

        public int getCount() {
            return count;
        }

        public String getMoney() {
            return Money.format(total);
        }
    }

    @Transactional(readOnly = true)
    public Cart view(Long user) {
        List<Line> lines = new ArrayList<>();
        long total = 0;
        int count = 0;
        for (CartItem item : carts.findByUserIdOrderByProductId(user)) {
            Product p = products.findById(item.productId).orElseThrow();
            long sub = Math.multiplyExact(p.priceMinorUnits, item.quantity);
            total = Math.addExact(total, sub);
            count += item.quantity;
            lines.add(new Line(p, item.quantity, sub));
        }
        return new Cart(lines, total, count);
    }

    @Transactional
    public void change(Long user, Long product, int quantity, boolean add) {
        users.lockById(user).orElseThrow();
        if (quantity < 0 || quantity > 99 || (add && quantity == 0))
            throw new IllegalArgumentException("Quantity must be between 1 and 99.");
        Product p = products.findById(product).orElseThrow(() -> new IllegalArgumentException("Product unavailable."));
        CartItem c = carts.findByUserIdAndProductId(user, product).orElseGet(() -> {
            CartItem n = new CartItem();
            n.userId = user;
            n.productId = product;
            return n;
        });
        int next = add ? Math.addExact(c.quantity, quantity) : quantity;
        if (next == 0) {
            if (c.id != null)
                carts.delete(c);
            return;
        }
        if (!p.active || next > p.stockQuantity || next > 99)
            throw new IllegalArgumentException("Requested quantity is unavailable.");
        c.quantity = next;
        carts.save(c);
    }
}
