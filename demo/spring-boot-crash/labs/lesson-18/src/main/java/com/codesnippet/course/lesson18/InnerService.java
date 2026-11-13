package com.codesnippet.course.lesson18;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import java.util.Map;
@Service
public class InnerService {
    private Map<String,Boolean> state() {
        return Map.of("active",TransactionSynchronizationManager.isActualTransactionActive(),"newTransaction",TransactionAspectSupport.currentTransactionStatus().isNewTransaction());
    }
    @Transactional(propagation=Propagation.REQUIRED)
    public Map<String,Boolean> required() { return state(); }
    @Transactional(propagation=Propagation.REQUIRES_NEW)
    public Map<String,Boolean> requires_new() { return state(); }
    @Transactional(propagation=Propagation.MANDATORY)
    public Map<String,Boolean> mandatory() { return state(); }
    @Transactional(propagation=Propagation.NESTED)
    public Map<String,Boolean> nested() { return state(); }
    @Transactional(propagation=Propagation.SUPPORTS)
    public Map<String,Boolean> supports() { return state(); }
    @Transactional(propagation=Propagation.NOT_SUPPORTED)
    public Map<String,Boolean> not_supported() { return state(); }
    @Transactional(propagation=Propagation.NEVER)
    public Map<String,Boolean> never() { return state(); }
}
