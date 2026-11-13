package com.codesnippet.course.lesson45.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;
@Component
public class JwtService {
    private final SecretKey key;
    public JwtService(@Value("${jwt.secret}") String secret) { key=Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)); }
    public String generate(String username) {
        Date now=new Date();
        return Jwts.builder().subject(username).issuedAt(now).expiration(new Date(now.getTime()+60*60*1000)).signWith(key,Jwts.SIG.HS256).compact();
    }
    public String username(String token) { return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject(); }
}
