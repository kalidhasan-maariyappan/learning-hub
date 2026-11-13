package hub.commerce;

import java.nio.charset.StandardCharsets;
import java.security.*;
import java.time.*;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
  private final JdbcTemplate db;
  private final MailService mail;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public AuthService(JdbcTemplate db, MailService mail) {
    this.db = db;
    this.mail = mail;
  }

  static String hash(String raw) {
    try {
      return HexFormat.of()
          .formatHex(
              MessageDigest.getInstance("SHA-256").digest(raw.getBytes(StandardCharsets.UTF_8)));
    } catch (Exception e) {
      throw new IllegalStateException(e);
    }
  }

  private String token(String email, String kind, String family, Duration lifetime) {
    byte[] bytes = new byte[32];
    new SecureRandom().nextBytes(bytes);
    String raw = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    db.update(
        "insert into auth_token values (?,?,?,?,?,false)",
        hash(raw),
        email,
        kind,
        family,
        java.sql.Timestamp.from(Instant.now().plus(lifetime)));
    return raw;
  }

  @Transactional
  public void register(String email, String password) {
    db.update("insert into account values (?,?,false)", email, encoder.encode(password));
    mail.send(
        email,
        "Verify account",
        "POST /auth/verify with token: "
            + token(email, "VERIFY", UUID.randomUUID().toString(), Duration.ofHours(1)));
  }

  @Transactional
  public void verify(String raw) {
    String email = consume(raw, "VERIFY").email();
    db.update("update account set verified=true where email=?", email);
  }

  record Stored(String email, String family) {}

  private Stored consume(String raw, String kind) {
    var rows =
        db.query(
            "select email,family from auth_token where hash=? and kind=? and consumed=false and"
                + " expires_at>CURRENT_TIMESTAMP for update",
            (r, n) -> new Stored(r.getString(1), r.getString(2)),
            hash(raw),
            kind);
    if (rows.isEmpty())
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
    db.update("update auth_token set consumed=true where hash=?", hash(raw));
    return rows.getFirst();
  }

  public record Session(String accessToken, String refreshToken) {}

  private Session session(String email, String family) {
    return new Session(
        token(email, "ACCESS", family, Duration.ofMinutes(10)),
        token(email, "REFRESH", family, Duration.ofDays(7)));
  }

  @Transactional
  public Session login(String email, String password) {
    var rows =
        db.query(
            "select password,verified from account where email=?",
            (r, n) -> Map.entry(r.getString(1), r.getBoolean(2)),
            email);
    if (rows.isEmpty()
        || !rows.getFirst().getValue()
        || !encoder.matches(password, rows.getFirst().getKey()))
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED, "Invalid credentials or unverified email");
    return session(email, UUID.randomUUID().toString());
  }

  @Transactional
  public Session refresh(String raw) {
    var stored = consume(raw, "REFRESH");
    db.update("delete from auth_token where family=? and kind='ACCESS'", stored.family());
    return session(stored.email(), stored.family());
  }

  @Transactional
  public void logout(String raw) {
    var stored = consume(raw, "REFRESH");
    db.update("delete from auth_token where family=?", stored.family());
  }

  public String authenticate(String raw) {
    var names =
        db.queryForList(
            "select email from auth_token where hash=? and kind='ACCESS' and consumed=false and"
                + " expires_at>CURRENT_TIMESTAMP",
            String.class,
            hash(raw));
    return names.isEmpty() ? null : names.getFirst();
  }

  @Transactional
  public void requestReset(String email) {
    if (!db.queryForList("select email from account where email=?", String.class, email).isEmpty())
      mail.send(
          email,
          "Reset password",
          "POST /auth/reset with token: "
              + token(email, "RESET", UUID.randomUUID().toString(), Duration.ofMinutes(15)));
  }

  @Transactional
  public void reset(String raw, String password) {
    String email = consume(raw, "RESET").email();
    db.update("update account set password=? where email=?", encoder.encode(password), email);
    db.update("delete from auth_token where email=?", email);
  }
}
