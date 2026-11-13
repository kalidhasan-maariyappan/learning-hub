package hub.commerce;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ReceiptService {
  private final MailService mail;

  public ReceiptService(MailService mail) {
    this.mail = mail;
  }

  @Async
  public void receipt(String email, Long orderId) {
    mail.send(email, "Order receipt", "Your order " + orderId + " has been paid.");
  }
}
