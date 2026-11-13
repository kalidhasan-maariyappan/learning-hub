package com.codesnippet.course.lesson34.repository;

import com.codesnippet.course.lesson34.entity.OrderRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OrderRepository extends JpaRepository<OrderRecord,Long> { List<OrderRecord> findByStatus(String status); }
