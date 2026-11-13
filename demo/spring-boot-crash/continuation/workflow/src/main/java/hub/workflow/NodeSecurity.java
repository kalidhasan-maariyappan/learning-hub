package hub.workflow;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class NodeSecurity extends OncePerRequestFilter {
  private final String secret;

  public NodeSecurity(@Value("${workflow.secret}") String secret) {
    if (secret.length() < 16)
      throw new IllegalArgumentException("Set WORKFLOW_SECRET to at least 16 characters");
    this.secret = secret;
  }

  protected void doFilterInternal(HttpServletRequest q, HttpServletResponse r, FilterChain chain)
      throws ServletException, IOException {
    if (q.getRequestURI().startsWith("/actuator/health")) {
      chain.doFilter(q, r);
      return;
    }
    String candidate = q.getHeader("X-Workflow-Key");
    if (candidate == null
        || !MessageDigest.isEqual(
            candidate.getBytes(StandardCharsets.UTF_8), secret.getBytes(StandardCharsets.UTF_8))) {
      r.sendError(401);
      return;
    }
    chain.doFilter(q, r);
  }
}
