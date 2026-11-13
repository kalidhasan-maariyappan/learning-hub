package hub.commerce;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class PurchaseOrder {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Version public long version;
  public String owner, product, status;
  public int quantity;
  public long totalCents;
  public Instant createdAt;
  public String paymentId, checkoutId, refundId;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  @com.fasterxml.jackson.annotation.JsonIgnore
  public java.util.List<OrderLine> lines = new java.util.ArrayList<>();

  @Column(length = 2048)
  public String checkoutUrl;

  protected PurchaseOrder() {}

  public PurchaseOrder(String owner, String product, int quantity) {
    this.lines.add(new OrderLine(this, product, quantity));
    this.owner = owner;
    this.product = product;
    this.quantity = quantity;
    this.totalCents = Math.multiplyExact(quantity, 2500L);
    this.status = "PENDING";
    this.createdAt = Instant.now();
  }
}
