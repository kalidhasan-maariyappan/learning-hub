package com.codesnippet.course.lesson62.config;

import org.springframework.context.annotation.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
@Configuration
@ConditionalOnClass(name="org.springframework.data.redis.core.RedisTemplate")
public class RedisCacheConfig { @Bean public String redisClasspathMessage() { return "Redis class is available"; } }
