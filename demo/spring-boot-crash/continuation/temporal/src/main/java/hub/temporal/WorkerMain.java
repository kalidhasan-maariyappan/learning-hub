package hub.temporal;

import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.WorkerFactory;

public class WorkerMain {
  public static void main(String[] args) {
    String secret = System.getenv("WORKFLOW_SECRET");
    if (secret == null || secret.length() < 16)
      throw new IllegalArgumentException("Set WORKFLOW_SECRET first");
    var service = WorkflowServiceStubs.newLocalServiceStubs();
    var client = WorkflowClient.newInstance(service);
    var factory = WorkerFactory.newInstance(client);
    var worker = factory.newWorker("checkout");
    worker.registerWorkflowImplementationTypes(CheckoutWorkflowImpl.class);
    worker.registerActivitiesImplementations(
        new ParticipantActivities(secret, "http://localhost:8101", "http://localhost:8102"));
    factory.start();
  }
}
