package com.example.ecommerce.controller;

import com.example.ecommerce.dto.AddressForm;
import com.example.ecommerce.service.*;
import com.example.ecommerce.payment.RazorpayGateway;
import jakarta.validation.Valid;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.security.Principal;
import java.util.UUID;

@Controller
public class CheckoutController {
    private final AccountService accounts;
    private final CartService carts;
    private final OrderService orders;
    private final PaymentService payments;
    private final RazorpayGateway gateway;

    public CheckoutController(AccountService a, CartService c, OrderService o, PaymentService p, RazorpayGateway g) {
        accounts = a;
        carts = c;
        orders = o;
        payments = p;
        gateway = g;
    }

    @GetMapping("/checkout")
    String checkout(Principal principal, HttpSession session, Model model) {
        var cart = carts.view(accounts.current(principal.getName()).id);
        if (cart.count() == 0)
            return "redirect:/cart";
        if (session.getAttribute("checkoutToken") == null)
            session.setAttribute("checkoutToken", UUID.randomUUID().toString());
        model.addAttribute("cart", cart);
        model.addAttribute("checkoutToken", session.getAttribute("checkoutToken"));
        return "checkout/checkout";
    }

    @PostMapping("/checkout/create-order")
    String create(Principal principal, @Valid @ModelAttribute AddressForm form, BindingResult errors, @RequestParam String requestToken, HttpSession session, RedirectAttributes flash) {
        if (errors.hasErrors()) {
            flash.addFlashAttribute("error", errors.getAllErrors().getFirst().getDefaultMessage());
            return "redirect:/checkout";
        }
        if (!requestToken.equals(session.getAttribute("checkoutToken")))
            throw new IllegalArgumentException("Checkout expired. Review your bag again.");
        var order = payments.initiate(accounts.current(principal.getName()), requestToken, form.formatted());
        return "redirect:/orders/" + order.id;
    }

    @PostMapping("/checkout/verify")
    String verify(Principal principal, @RequestParam Long orderId, @RequestParam String razorpay_order_id, @RequestParam String razorpay_payment_id, @RequestParam String razorpay_signature, RedirectAttributes flash) {
        payments.verify(accounts.current(principal.getName()), orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature);
        flash.addFlashAttribute("notice", "Payment checked with Razorpay. See the confirmed status below.");
        return "redirect:/orders/" + orderId;
    }

    @GetMapping("/orders")
    String history(Principal p, Model m) {
        m.addAttribute("orders", orders.history(accounts.current(p.getName())));
        return "orders/history";
    }

    @GetMapping("/orders/{id}")
    String order(@PathVariable Long id, Principal p, Model m) {
        var order = orders.owned(id, accounts.current(p.getName()));
        m.addAttribute("order", order);
        m.addAttribute("items", orders.items(id));
        m.addAttribute("payments", orders.payments(id));
        m.addAttribute("refunds", orders.refunds(id));
        m.addAttribute("audit", orders.audit(id));
        m.addAttribute("keyId", gateway.publicKey());
        return "orders/detail";
    }

    @PostMapping("/orders/{id}/reconcile")
    String reconcile(@PathVariable Long id, Principal p, RedirectAttributes flash) {
        payments.reconcile(accounts.current(p.getName()), id);
        flash.addFlashAttribute("notice", "Latest payment and refund status fetched from Razorpay.");
        return "redirect:/orders/" + id;
    }
}
