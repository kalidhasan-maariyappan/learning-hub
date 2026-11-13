package hub.commerce;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderDetail {
  private final DetailService details;

  public OrderDetail(DetailService details) {
    this.details = details;
  }

  public record Line(String product, int quantity) {}

  public record View(Long id, String status, List<Line> lines) {}

  @GetMapping("/api/v1/orders/{id}/detail")
  public View detail(@PathVariable Long id, java.security.Principal user) {
    return details.read(id, user.getName());
  }

  @Service
  public static class DetailService {
    private final Orders orders;
    private final OrderService owner;

    public DetailService(Orders orders, OrderService owner) {
      this.orders = orders;
      this.owner = owner;
    }

    @Transactional(readOnly = true)
    public View read(Long id, String username) {
      owner.owned(id, username);
      var o = orders.detail(id).orElseThrow();
      return new View(
          o.id, o.status, o.lines.stream().map(l -> new Line(l.product, l.quantity)).toList());
    }
  }
}
