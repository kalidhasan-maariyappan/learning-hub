package hub.commerce;

import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface Orders extends JpaRepository<PurchaseOrder, Long> {
  @EntityGraph(attributePaths = "lines")
  @Query("select o from PurchaseOrder o where o.id=:id")
  Optional<PurchaseOrder> detail(@Param("id") Long id);

  Page<PurchaseOrder> findByOwner(String owner, Pageable pageable);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("select o from PurchaseOrder o where o.id=:id")
  Optional<PurchaseOrder> lock(@Param("id") Long id);
}
