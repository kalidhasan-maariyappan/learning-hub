package com.codesnippet.course.lesson61;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
class OrderServiceTest {
    @Test void constructsWithRequiredDependency() { OrderService service=new OrderService(new PaymentService());assertDoesNotThrow(()->service.processOrders(List.of(new Order(1)))); }
}
