package hub.temporal;

import io.temporal.activity.*;

@ActivityInterface
public interface CheckoutActivities {
  void reserve(String id);

  String charge(String id, boolean decline);

  void release(String id);

  void commit(String id);
}
