package com.codesnippet.course.lesson36.filter;

import org.springframework.stereotype.Component;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
@Component
public class LoggingFilter implements Filter {
    public void doFilter(ServletRequest request,ServletResponse response,FilterChain chain) throws IOException,ServletException {
        System.out.println("Filter before: " + ((HttpServletRequest)request).getRequestURI());
        chain.doFilter(request,response);
        System.out.println("Filter after");
    }
}
