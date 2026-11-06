package com.example.ecommerce;

import com.example.ecommerce.payment.SignatureVerifier;
import com.example.ecommerce.service.Money;
import org.junit.jupiter.api.Test;
import java.nio.charset.StandardCharsets;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HexFormat;
import static org.assertj.core.api.Assertions.*;

class SignatureAndMoneyTest {
    @Test
    void knownHmacVectorAndTampering() {
        byte[] body = "The quick brown fox jumps over the lazy dog".getBytes(StandardCharsets.UTF_8);
        String signature = "f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8";
        assertThat(SignatureVerifier.verify(body, signature, "key")).isTrue();
        assertThat(SignatureVerifier.verify("tampered".getBytes(StandardCharsets.UTF_8), signature, "key")).isFalse();
        assertThat(SignatureVerifier.verify(body, "xx", "key")).isFalse();
        assertThat(SignatureVerifier.verify(body, signature, "")).isFalse();
    }

    @Test
    void checkoutUsesStoredOrderAndPaymentWithSeparator() throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec("secret".getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        String signature = HexFormat.of().formatHex(mac.doFinal("order_123|pay_456".getBytes(StandardCharsets.UTF_8)));
        assertThat(SignatureVerifier.checkout("order_123", "pay_456", signature, "secret")).isTrue();
        assertThat(SignatureVerifier.checkout("order_altered", "pay_456", signature, "secret")).isFalse();
    }

    @Test
    void exactMoneyRejectsRoundingNegativeAndOverflow() {
        assertThat(Money.parse("199.99")).isEqualTo(19999);
        assertThat(Money.format(19999)).isEqualTo("₹199.99");
        for (String value : new String[]{"1.001", "-1", "0", "NaN", "9999999999999999999999"})
            assertThatIllegalArgumentException().isThrownBy(() -> Money.parse(value));
    }
}
