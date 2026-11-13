package hub.commerce;

import java.io.IOException;
import java.nio.file.*;
import java.security.Principal;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/files")
public class Files {
  private final Path root;
  private final JdbcTemplate db;

  public Files(@Value("${app.upload-directory}") String directory, JdbcTemplate db)
      throws IOException {
    root = Path.of(directory).toAbsolutePath().normalize();
    java.nio.file.Files.createDirectories(root);
    this.db = db;
  }

  @PostMapping
  public Map<String, String> upload(@RequestParam MultipartFile file, Principal p)
      throws IOException {
    if (file.isEmpty() || file.getSize() > 1048576)
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "File must contain 1–1048576 bytes");
    byte[] bytes = file.getBytes();
    if (bytes.length < 5
        || !new String(bytes, 0, 5, java.nio.charset.StandardCharsets.US_ASCII).equals("%PDF-"))
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "This example accepts PDF headers only");
    String id = UUID.randomUUID().toString();
    java.nio.file.Files.write(root.resolve(id), bytes, StandardOpenOption.CREATE_NEW);
    db.update("insert into attachment values (?,?,?)", id, p.getName(), "document.pdf");
    return Map.of("id", id);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Resource> download(@PathVariable UUID id, Principal p) {
    if (db.queryForList(
            "select id from attachment where id=? and owner=?",
            String.class,
            id.toString(),
            p.getName())
        .isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    return ResponseEntity.ok()
        .header("Content-Disposition", "attachment; filename=\"document.pdf\"")
        .header("X-Content-Type-Options", "nosniff")
        .contentType(MediaType.APPLICATION_PDF)
        .body(new FileSystemResource(root.resolve(id.toString())));
  }
}
