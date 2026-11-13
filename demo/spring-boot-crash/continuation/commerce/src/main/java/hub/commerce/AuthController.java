package hub.commerce;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
  public record Credentials(
      @Email @NotBlank String email, @NotBlank @Size(min = 12, max = 72) String password) {}

  public record Token(@NotBlank String token) {}

  public record EmailAddress(@Email @NotBlank String email) {}

  public record Reset(
      @NotBlank String token, @NotBlank @Size(min = 12, max = 72) String password) {}

  private final AuthService auth;

  public AuthController(AuthService auth) {
    this.auth = auth;
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public void register(@Valid @RequestBody Credentials r) {
    auth.register(r.email(), r.password());
  }

  @PostMapping("/verify")
  public void verify(@Valid @RequestBody Token r) {
    auth.verify(r.token());
  }

  @PostMapping("/login")
  public AuthService.Session login(@Valid @RequestBody Credentials r) {
    return auth.login(r.email(), r.password());
  }

  @PostMapping("/refresh")
  public AuthService.Session refresh(@Valid @RequestBody Token r) {
    return auth.refresh(r.token());
  }

  @PostMapping("/logout")
  public void logout(@Valid @RequestBody Token r) {
    auth.logout(r.token());
  }

  @PostMapping("/forgot")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public void forgot(@Valid @RequestBody EmailAddress r) {
    auth.requestReset(r.email());
  }

  @PostMapping("/reset")
  public void reset(@Valid @RequestBody Reset r) {
    auth.reset(r.token(), r.password());
  }
}
