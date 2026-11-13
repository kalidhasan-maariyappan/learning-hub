package hub.temporal;

import io.temporal.activity.ActivityOptions;
import io.temporal.common.RetryOptions;
import io.temporal.workflow.Workflow;
import java.time.Duration;

public class CheckoutWorkflowImpl implements CheckoutWorkflow {
  private final CheckoutActivities activities =
      Workflow.newActivityStub(
          CheckoutActivities.class,
          ActivityOptions.newBuilder()
              .setStartToCloseTimeout(Duration.ofSeconds(5))
              .setRetryOptions(RetryOptions.newBuilder().setMaximumAttempts(5).build())
              .build());

  public String checkout(String id, boolean decline) {
    activities.reserve(id);
    String result = activities.charge(id, decline);
    if (result.equals("DECLINED")) {
      activities.release(id);
      return "CANCELLED";
    }
    activities.commit(id);
    return "COMPLETED";
  }
}
