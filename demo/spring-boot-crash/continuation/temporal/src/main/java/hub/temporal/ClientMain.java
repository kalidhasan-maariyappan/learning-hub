package hub.temporal;

import io.temporal.client.*;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class ClientMain {
  public static void main(String[] args) {
    if (args.length != 1) throw new IllegalArgumentException("Supply a fresh workflow UUID");
    var service = WorkflowServiceStubs.newLocalServiceStubs();
    try {
      var client = WorkflowClient.newInstance(service);
      var flow =
          client.newWorkflowStub(
              CheckoutWorkflow.class,
              WorkflowOptions.newBuilder()
                  .setTaskQueue("checkout")
                  .setWorkflowId("checkout-" + args[0])
                  .build());
      System.out.println(flow.checkout(args[0], false));
    } finally {
      service.shutdown();
    }
  }
}
