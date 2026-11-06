package com.example.ecommerce.controller;

import com.example.ecommerce.dto.ProductForm;
import com.example.ecommerce.repository.*;
import com.example.ecommerce.service.*;
import com.example.ecommerce.payment.RazorpayGateway;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import jakarta.validation.Valid;
import java.util.UUID;

@Controller
@RequestMapping("/admin")
public class AdminController {
    final ProductRepository products;
    final OrderRepository orders;
    final PaymentRepository payments;
    final RefundRepository refunds;
    final CatalogService catalog;
    final PaymentService paymentService;
    final RazorpayGateway gateway;

    public AdminController(ProductRepository p, OrderRepository o, PaymentRepository ps, RefundRepository r, CatalogService c, PaymentService service, RazorpayGateway g) {
        products = p;
        orders = o;
        payments = ps;
        refunds = r;
        catalog = c;
        paymentService = service;
        gateway = g;
    }

    @GetMapping({"", "/"})
    String dashboard(Model m) {
        m.addAttribute("orderCount", orders.count());
        m.addAttribute("productCount", products.count());
        m.addAttribute("revenue", Money.format(
                payments.findAll().stream().filter(p -> p.status.equals("captured") || p.status.equals("refunded")).mapToLong(p -> p.amountMinorUnits).sum()));
        m.addAttribute("refunded", Money.format(refunds.findAll().stream().filter(r -> r.status.equals("processed")).mapToLong(r -> r.amountMinorUnits).sum()));
        m.addAttribute("orders", orders.findAllByOrderByIdDesc().stream().limit(8).toList());
        m.addAttribute("webhookConfigured", gateway.webhookConfigured());
        return "admin/dashboard";
    }

    @GetMapping("/products")
    String products(Model m, @RequestParam(required = false) Long edit) {
        m.addAttribute("products", products.findAll());
        if (edit != null)
            m.addAttribute("editing", products.findById(edit).orElseThrow());
        return "admin/products";
    }

    @PostMapping("/products")
    String save(@Valid @ModelAttribute ProductForm form, BindingResult errors, RedirectAttributes flash) {
        if (errors.hasErrors()) {
            flash.addFlashAttribute("error", errors.getAllErrors().getFirst().getDefaultMessage());
            return "redirect:/admin/products";
        }
        catalog.save(form);
        flash.addFlashAttribute("notice", "Product saved.");
        return "redirect:/admin/products";
    }

    @GetMapping("/orders")
    String orders(Model m) {
        m.addAttribute("orders", orders.findAllByOrderByIdDesc());
        return "admin/orders";
    }

    @GetMapping("/payments")
    String payments(Model m) {
        m.addAttribute("payments", payments.findAllByOrderByIdDesc());
        return "admin/payments";
    }

    @GetMapping("/refunds")
    String refunds(Model m) {
        m.addAttribute("payments", payments.findAllByOrderByIdDesc());
        m.addAttribute("refunds", refunds.findAllByOrderByIdDesc());
        m.addAttribute("refundToken", UUID.randomUUID().toString());
        return "admin/refunds";
    }

    @PostMapping("/refunds")
    String refund(@RequestParam Long paymentId, @RequestParam String amount, @RequestParam String requestToken, RedirectAttributes flash) {
        var refund = paymentService.requestRefund(paymentId, Money.parse(amount), requestToken);
        flash.addFlashAttribute("notice", "Refund status: " + refund.status + ". Reconcile the order for updates.");
        return "redirect:/admin/refunds";
    }
}
