package com.example.ecommerce.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

public final class Money {
    private Money() {
    }

    public static String format(long minor) {
        return "₹" + String.format(java.util.Locale.US, "%,.2f", BigDecimal.valueOf(minor, 2));
    }

    public static long parse(String rupees) {
        try {
            long amount = new BigDecimal(rupees).setScale(2, RoundingMode.UNNECESSARY).movePointRight(2).longValueExact();
            if (amount < 100 || amount > 100_000_000)
                throw new IllegalArgumentException();
            return amount;
        } catch (Exception ex) {
            throw new IllegalArgumentException("Enter a valid amount from ₹1 to ₹10,00,000 with at most two decimal places.");
        }
    }
}
