package com.example.ecommerce.controller;

import com.example.ecommerce.repository.*;
import com.example.ecommerce.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import jakarta.servlet.http.HttpSession;
import java.security.Principal;

@Controller
public class StoreController {
    private final ProductRepository products;
    private final AccountService accounts;
    private final CartService cart;

    public StoreController(ProductRepository p, AccountService a, CartService c) {
        products = p;
        accounts = a;
        cart = c;
    }

    @GetMapping("/")
    String home(@RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "") String category, @RequestParam(defaultValue = "0") int page, Model model) {
        q = q.length() > 100 ? q.substring(0, 100) : q;
        var result = products.search(q.trim(), category, PageRequest.of(Math.max(0, page), 6, Sort.by("id")));
        model.addAttribute("products", result.getContent());
        model.addAttribute("total", result.getTotalElements());
        model.addAttribute("pages", result.getTotalPages());
        model.addAttribute("page", result.getNumber());
        model.addAttribute("q", q);
        model.addAttribute("category", category);
        model.addAttribute("categories", products.categories());
        return "shop/products";
    }

    @GetMapping("/products/{id}")
    String product(@PathVariable Long id, Model model) {
        model.addAttribute("product", products.findById(id).filter(p -> p.active).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
        return "shop/product";
    }

    @GetMapping("/cart")
    String cart(Principal principal, Model model) {
        model.addAttribute("cart", cart.view(accounts.current(principal.getName()).id));
        return "shop/cart";
    }

    @PostMapping("/cart/items")
    String change(Principal principal, @RequestParam Long productId, @RequestParam int quantity, @RequestParam(defaultValue = "false") boolean add, @RequestParam(defaultValue = "false") boolean remove, HttpSession session, RedirectAttributes flash) {
        if (remove)
            quantity = 0;
        cart.change(accounts.current(principal.getName()).id, productId, quantity, add);
        session.removeAttribute("checkoutToken");
        flash.addFlashAttribute("notice", quantity == 0 ? "Item removed from your bag." : "Your bag has been updated.");
        return "redirect:/cart";
    }
}
