package hub.commerce;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {
  private final Orders orders;
  private final MeterRegistry metrics;

  public OrderService(Orders orders, MeterRegistry metrics) {
    this.orders = orders;
    this.metrics = metrics;
  }

  @Transactional
  public PurchaseOrder create(String owner, OrderController.CreateOrder request) {
    var order = orders.save(new PurchaseOrder(owner, request.product(), request.quantity()));
    metrics.counter("commerce.orders.created").increment();
    return order;
  }

  public PurchaseOrder owned(Long id, String owner) {
    var o =
        orders
            .findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
    if (!o.owner.equals(owner))
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
    return o;
  }

  @Transactional
  public PurchaseOrder cancel(Long id, String owner, long expectedVersion) {
    var o = orders.lock(id).orElseThrow();
    if (!o.owner.equals(owner)) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    if (o.version != expectedVersion || !o.status.equals("PENDING"))
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Reload the order before cancelling");
    o.status = "CANCELLED";
    return o;
  }
}
