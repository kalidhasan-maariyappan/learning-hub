package com.codesnippet.course.lesson41.security;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import io.jsonwebtoken.JwtException;
import java.io.IOException;
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtService jwt; private final UserDetailsService users;
    public JwtRequestFilter(JwtService jwt,UserDetailsService users) { this.jwt=jwt;this.users=users; }
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain) throws ServletException,IOException {
        String header=request.getHeader("Authorization");
        if(header!=null && header.startsWith("Bearer ")) {
            try {
                String username=jwt.username(header.substring(7));
                var user=users.loadUserByUsername(username);
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities()));
            } catch(JwtException|IllegalArgumentException error) { SecurityContextHolder.clearContext(); }
        }
        chain.doFilter(request,response);
    }
}
