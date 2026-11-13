package com.codesnippet.course.lesson47;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.Map;
@RestController
public class ProfileController {
    @GetMapping("/public") public String publicPage() { return "OAuth2 client configured"; }
    @GetMapping("/profile") public Map<String,Object> profile(@AuthenticationPrincipal OAuth2User user) { return user.getAttributes(); }
}
