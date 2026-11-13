package hub.commerce;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class OrderLine {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false)
  @JsonIgnore
  public PurchaseOrder order;

  public String product;
  public int quantity;

  protected OrderLine() {}

  public OrderLine(PurchaseOrder order, String product, int quantity) {
    this.order = order;
    this.product = product;
    this.quantity = quantity;
  }
}
