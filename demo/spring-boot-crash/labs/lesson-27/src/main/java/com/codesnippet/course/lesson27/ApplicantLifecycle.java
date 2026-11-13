package com.codesnippet.course.lesson27;

import com.codesnippet.course.lesson27.entity.Applicant;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.LinkedHashMap;
import java.util.Map;
@Service
public class ApplicantLifecycle {
    @PersistenceContext private EntityManager manager;
    @Transactional public Map<String,Boolean> trace() {
        Map<String,Boolean> result=new LinkedHashMap<>();
        Applicant applicant=new Applicant(null,"Chetan");
        result.put("newObjectManaged",manager.contains(applicant));
        manager.persist(applicant); manager.flush();
        result.put("afterPersistManaged",manager.contains(applicant));
        manager.detach(applicant);
        result.put("afterDetachManaged",manager.contains(applicant));
        Applicant managed=manager.merge(applicant);
        result.put("mergeResultManaged",manager.contains(managed));
        manager.remove(managed); manager.flush();
        result.put("afterRemoveManaged",manager.contains(managed));
        return result;
    }
}
