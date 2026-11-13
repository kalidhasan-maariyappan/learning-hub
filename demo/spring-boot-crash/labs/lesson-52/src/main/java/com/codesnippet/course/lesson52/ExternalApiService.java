package com.codesnippet.course.lesson52;

import org.springframework.stereotype.Service;
import org.springframework.retry.annotation.*;
@Service
public class ExternalApiService {
    @Retryable(retryFor=RuntimeException.class,maxAttempts=4,backoff=@Backoff(delay=2000,multiplier=2))
    public String callExternalApi() {
        System.out.println("Attempting external API");
        throw new RuntimeException("API is down");
    }
    @Recover public String recover(RuntimeException error) { return "Recovered after all attempts failed"; }
}
