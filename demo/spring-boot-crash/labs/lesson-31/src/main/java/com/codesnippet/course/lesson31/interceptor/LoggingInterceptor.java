package com.codesnippet.course.lesson31.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.*;
import jakarta.servlet.http.*;
@Component
public class LoggingInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response,Object handler) { System.out.println("Pre-handle: " + request.getRequestURI());return true; }
    public void postHandle(HttpServletRequest request,HttpServletResponse response,Object handler,ModelAndView model) { System.out.println("Post-handle"); }
    public void afterCompletion(HttpServletRequest request,HttpServletResponse response,Object handler,Exception error) { System.out.println("After-completion"); }
}
