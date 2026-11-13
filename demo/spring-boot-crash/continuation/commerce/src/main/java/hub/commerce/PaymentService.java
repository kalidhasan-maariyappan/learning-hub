package hub.commerce;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PaymentService {
  private final Orders orders;
  private final OrderService ownership;
  private final PaymentClient client;
  private final JdbcTemplate db;

  public PaymentService(
      Orders orders, OrderService ownership, PaymentClient client, JdbcTemplate db) {
    this.orders = orders;
    this.ownership = ownership;
    this.client = client;
    this.db = db;
  }

  @Transactional
  public PaymentClient.Checkout checkout(Long id, String owner) {
    ownership.owned(id, owner);
    var order = orders.lock(id).orElseThrow();
    if (!order.status.equals("PENDING")) throw new ResponseStatusException(HttpStatus.CONFLICT);
    if (order.checkoutUrl != null)
      return new PaymentClient.Checkout(order.checkoutId, order.checkoutUrl);
    var checkout = client.checkout(order);
    order.checkoutId = checkout.id();
    order.checkoutUrl = checkout.url();
    return checkout;
  }

  @Transactional
  public void paid(
      String eventId, Long id, String session, String intent, long amount, String currency) {
    var order = orders.lock(id).orElseThrow();
    if (!db.queryForList("select id from payment_event where id=?", String.class, eventId)
        .isEmpty()) return;
    if (!session.equals(order.checkoutId) || amount != order.totalCents || !currency.equals("usd"))
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Payment details do not match order");
    if (!order.status.equals("PENDING") && !order.status.equals("PAID"))
      throw new ResponseStatusException(
          HttpStatus.CONFLICT, "Reconcile payment for cancelled order");
    db.update("insert into payment_event values (?)", eventId);
    order.paymentId = intent;
    order.status = "PAID";
  }

  @Transactional
  public PurchaseOrder reconcile(Long id, String owner) {
    ownership.owned(id, owner);
    var o = orders.lock(id).orElseThrow();
    if (o.status.equals("PENDING") && o.checkoutId != null) {
      var r = client.session(o.checkoutId);
      if ("paid".equals(r.get("payment_status")))
        paid(
            "reconcile-" + o.checkoutId,
            id,
            o.checkoutId,
            String.valueOf(r.get("payment_intent")),
            ((Number) r.get("amount_total")).longValue(),
            String.valueOf(r.get("currency")));
    } else if (o.status.equals("REFUND_PENDING")) {
      var r = client.refundStatus(o.refundId);
      if ("succeeded".equals(r.get("status"))) o.status = "REFUNDED";
    }
    return o;
  }

  @Transactional
  public Map<?, ?> refund(Long id, String owner) {
    ownership.owned(id, owner);
    var o = orders.lock(id).orElseThrow();
    if (!o.status.equals("PAID")) throw new ResponseStatusException(HttpStatus.CONFLICT);
    var result = client.refund(id, o.paymentId);
    o.refundId = String.valueOf(result.get("id"));
    o.status = "REFUND_PENDING";
    return result;
  }
}
