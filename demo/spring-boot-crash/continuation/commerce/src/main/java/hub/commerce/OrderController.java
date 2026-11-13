package hub.commerce;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.net.URI;
import java.security.Principal;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
  public record CreateOrder(
      @NotBlank @Size(max = 100) String product, @Min(1) @Max(20) int quantity) {}

  private final OrderService service;
  private final Orders orders;

  public OrderController(OrderService service, Orders orders) {
    this.service = service;
    this.orders = orders;
  }

  @PostMapping
  public ResponseEntity<PurchaseOrder> create(
      @Valid @RequestBody CreateOrder request, Principal principal) {
    var o = service.create(principal.getName(), request);
    return ResponseEntity.created(URI.create("/api/v1/orders/" + o.id)).body(o);
  }

  @GetMapping("/{id}")
  public PurchaseOrder get(@PathVariable Long id, Principal p) {
    return service.owned(id, p.getName());
  }

  @GetMapping
  public Page<PurchaseOrder> list(
      Principal p,
      @RequestParam(defaultValue = "0") @Min(0) int page,
      @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size) {
    return orders.findByOwner(p.getName(), PageRequest.of(page, size, Sort.by("id").descending()));
  }

  @PostMapping("/{id}/cancel")
  public PurchaseOrder cancel(@PathVariable Long id, @RequestParam long version, Principal p) {
    return service.cancel(id, p.getName(), version);
  }
}
