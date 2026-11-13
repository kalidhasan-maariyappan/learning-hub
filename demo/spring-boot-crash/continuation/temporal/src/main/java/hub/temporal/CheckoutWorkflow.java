package hub.temporal;

import io.temporal.workflow.*;

@WorkflowInterface
public interface CheckoutWorkflow {
  @WorkflowMethod
  String checkout(String orderId, boolean decline);
}
