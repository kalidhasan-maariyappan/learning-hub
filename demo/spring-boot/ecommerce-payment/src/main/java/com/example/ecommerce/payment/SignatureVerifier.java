package com.example.ecommerce.payment;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public final class SignatureVerifier {
    private SignatureVerifier() {
    }

    public static boolean verify(byte[] body, String signature, String secret) {
        if (secret == null || secret.isBlank() || signature == null || !signature.matches("[0-9a-fA-F]{64}"))
            return false;
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return MessageDigest.isEqual(mac.doFinal(body), HexFormat.of().parseHex(signature));
        } catch (java.security.GeneralSecurityException ex) {
            throw new IllegalStateException("Signature verifier unavailable", ex);
        }
    }

    public static boolean checkout(String order, String payment, String signature, String secret) {
        return verify((order + "|" + payment).getBytes(StandardCharsets.UTF_8), signature, secret);
    }
}
