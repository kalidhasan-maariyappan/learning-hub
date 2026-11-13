package com.codesnippet.course.lesson28.repository;

import com.codesnippet.course.lesson28.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface ApplicantRepository extends JpaRepository<Applicant,Long> {
    List<Applicant> findByStatus(String status);
    List<Applicant> findByNameAndStatus(String name,String status);
    List<Applicant> findByStatusOrderByNameAsc(String status);
    @Query("select a from Applicant a where lower(a.name) like lower(concat('%', :name, '%'))")
    List<Applicant> findApplicantsByPartialName(@Param("name") String name);
}
