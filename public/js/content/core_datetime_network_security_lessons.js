// Focused lessons for date/time, networking and secure Java APIs.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, note, table, code } = JT.h;
  function add(group, id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_' + group + '_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('datetime_networking', 'instant_local_zoned', 'Instant vs LocalDateTime vs ZonedDateTime',
    '<code>Instant</code> represents a moment on the UTC timeline. <code>LocalDateTime</code> is a wall-clock date and time with no zone. <code>ZonedDateTime</code> combines a local date-time with a time zone and its rules.',
    'Choosing the right type avoids confusing a global event time with a local appointment on a calendar.',
    'Store an Instant for event timestamps. Use a LocalDateTime for a zone-free local value only when the surrounding context supplies the zone. Use ZonedDateTime when zone rules matter.',
    `import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class Main {
    public static void main(String[] args) {
        Instant moment = Instant.parse("2026-04-01T12:00:00Z");
        var local = LocalDateTime.ofInstant(moment, ZoneId.of("Asia/Kolkata"));
        System.out.println(moment);
        System.out.println(local);
    }
}`, '2026-04-01T12:00:00Z\n2026-04-01T17:30',
    ['LocalDateTime does not contain a time zone or offset.', 'Instant is appropriate for globally ordered timestamps.', 'Use a region zone such as Europe/Paris when daylight-saving rules matter.'],
    'Do not store a user’s future local appointment as a LocalDateTime alone if you also need to know its time zone.');

  add('datetime_networking', 'timezone_dst', 'Time-zone and daylight-saving pitfalls',
    'A time zone such as America/New_York contains historical and future daylight-saving rules. On clock changes, a local time can be missing or occur twice.',
    'Using a zone-aware API prevents incorrect assumptions about fixed UTC offsets and 24-hour calendar days.',
    'Use ZoneId and ZonedDateTime to apply the zone’s rules. When parsing ambiguous or nonexistent local times, decide how the application should resolve the case.',
    `import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {
    public static void main(String[] args) {
        var local = LocalDateTime.of(2026, 3, 8, 2, 30);
        var zoned = ZonedDateTime.of(local, ZoneId.of("America/New_York"));
        System.out.println(zoned);
    }
}`, '2026-03-08T03:30-04:00[America/New_York]',
    ['A ZoneId contains rules that can change over time.', 'Daylight-saving transitions create gaps and overlaps.', 'Test dates near transition boundaries for zones your application supports.'],
    'Do not add a fixed number of seconds to represent “same local time tomorrow” across a daylight-saving transition.');

  add('datetime_networking', 'duration_period', 'Duration vs Period',
    'Duration measures time on the timeline, usually in seconds and nanoseconds. Period describes a calendar amount in years, months and days.',
    'A day on a calendar is not always exactly 24 elapsed hours in a time zone with daylight-saving changes.',
    'Use Duration for elapsed time between instants. Use Period for calendar movement between dates. Apply each to compatible temporal types.',
    `import java.time.Duration;
import java.time.Period;
import java.time.ZonedDateTime;
import java.time.ZoneId;

public class Main {
    public static void main(String[] args) {
        var start = ZonedDateTime.of(2026, 3, 8, 0, 0, 0, 0, ZoneId.of("America/New_York"));
        System.out.println(start.plus(Period.ofDays(1)));
        System.out.println(start.plus(Duration.ofDays(1)));
    }
}`, '2026-03-09T00:00-04:00[America/New_York]\n2026-03-09T01:00-04:00[America/New_York]',
    ['Period models calendar units.', 'Duration.ofDays(1) means 24 hours.', 'Choose based on whether the requirement is calendar-based or elapsed-time-based.'],
    'Do not use Duration for a rule such as “same local time on the next calendar day.”');

  add('datetime_networking', 'socket_programming', 'Socket programming',
    'A Socket is an endpoint for a network connection. Java sockets commonly communicate over TCP using input and output streams.',
    'Socket APIs are useful when an application needs a direct transport connection or must implement a custom protocol.',
    'A client connects to a host and port. The two ends exchange bytes using streams, then close the socket to release resources.',
    null, null,
    ['Define message framing because TCP is a byte stream.', 'Set connect and read timeouts.', 'Close sockets and streams reliably.'],
    'Do not assume one read call receives one complete application message.',
    h2('Client code shape (connects to a real network host)') + code(`try (Socket socket = new Socket()) {
    socket.connect(new InetSocketAddress(host, port), 2000);
    socket.setSoTimeout(2000);
    // Read and write a framed protocol here.
}`));

  add('datetime_networking', 'tcp_udp', 'TCP vs UDP',
    'TCP provides a reliable, ordered byte stream between endpoints. UDP sends independent datagrams without TCP’s delivery and ordering guarantees.',
    'The transport choice affects latency, reliability, message boundaries and how an application handles loss or retries.',
    'TCP handles retransmission and ordering at the transport layer. UDP applications decide how to handle missing, duplicated or reordered datagrams when those guarantees are needed.',
    null, null,
    ['TCP is connection-oriented and stream-based.', 'UDP preserves datagram boundaries but can lose packets.', 'Neither protocol automatically encrypts data.'],
    'Do not choose UDP only because it is described as faster; account for loss handling and application requirements.',
    table(['Property', 'TCP', 'UDP'], [['Delivery', 'Reliable and ordered stream', 'Best-effort datagrams'], ['Message boundaries', 'Not preserved', 'Preserved per datagram'], ['Typical Java APIs', 'Socket, ServerSocket', 'DatagramSocket, DatagramPacket']]));

  add('datetime_networking', 'serversocket', 'ServerSocket',
    'ServerSocket listens for incoming TCP connections on a local port. Each accepted connection is represented by a Socket.',
    'It is useful for learning TCP servers and for custom protocols that need to accept client connections.',
    'The server binds to a port, blocks in accept until a client connects, then communicates through the returned socket. Production servers must also manage concurrency, timeouts and shutdown.',
    null, null,
    ['Close the server socket to stop accepting connections.', 'Use a bounded executor for accepted clients.', 'Choose a deliberate bind address and port.'],
    'Do not expose a development socket server publicly without authentication, protocol validation and resource limits.',
    h2('Server code shape (opens a local port)') + code(`try (ServerSocket server = new ServerSocket(0)) {
    System.out.println("Listening on " + server.getLocalPort());
    try (Socket client = server.accept()) {
        // Handle one client.
    }
}`));

  add('datetime_networking', 'httpclient_api', 'HTTP Client API',
    'Java’s HttpClient API sends HTTP requests and receives responses. It supports synchronous send and asynchronous sendAsync operations.',
    'It provides a standard Java API for calling web services without adding an HTTP library.',
    'Build a client, create an HttpRequest with a URI and method, then send it with an appropriate BodyHandler. Network failures and non-success HTTP status codes need separate handling.',
    `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;

public class Main {
    public static void main(String[] args) {
        var request = HttpRequest.newBuilder(URI.create("https://example.test/status"))
            .GET().build();
        System.out.println(request.method() + " " + request.uri().getHost());
    }
}`, 'GET example.test',
    ['Use timeouts for requests that may wait on a network.', 'Check the HTTP status code as well as transport errors.', 'HttpClient can be reused for multiple requests.'],
    'Do not treat a successful connection as proof that the HTTP operation returned a success status.');

  add('datetime_networking', 'uri_url', 'URI and URL handling',
    'URI identifies a resource with structured components. URL is a locator that can be used to access a resource through a protocol handler.',
    'Parsing and encoding components correctly avoids malformed links and bugs caused by concatenating untrusted text into a URL.',
    'Use URI to parse or build components. Encode individual query values with the appropriate encoder rather than encoding an entire URI as one string.',
    `import java.net.URI;

public class Main {
    public static void main(String[] args) {
        URI uri = URI.create("https://api.example.test/orders?id=17");
        System.out.println(uri.getScheme());
        System.out.println(uri.getHost());
        System.out.println(uri.getPath());
    }
}`, 'https\napi.example.test\n/orders',
    ['URI has separate scheme, authority, path, query and fragment components.', 'Prefer URI for parsing and construction.', 'Validate hosts and schemes when a URI comes from untrusted input.'],
    'Do not build a URI by concatenating raw user input; reserved characters can change its meaning.');

  add('datetime_networking', 'tls_https', 'TLS/HTTPS fundamentals',
    'TLS protects a network connection with encryption and peer authentication. HTTPS is HTTP carried over TLS.',
    'TLS helps prevent eavesdropping and tampering and lets a client verify the server identity when certificates are checked correctly.',
    'The client and server negotiate cryptographic parameters, validate certificates and establish session keys before application data is exchanged.',
    null, null,
    ['Use current platform TLS defaults unless there is a reviewed reason to configure them.', 'Certificate and hostname validation are essential.', 'Application-layer authentication is still needed.'],
    'Never install a trust-all certificate manager or disable hostname checks to work around a certificate error.',
    note('Java HttpClient validates TLS certificates using its configured trust settings by default. A certificate failure should be investigated, not bypassed.'));

  add('security_secure_coding', 'input_validation', 'Input validation and trust boundaries',
    'Input validation checks that data from outside a trusted component matches the expected format and rules before the application uses it.',
    'Validation blocks malformed or out-of-range data from reaching parsers, database queries, file paths and business operations.',
    'Validate at each trust boundary, parse into a typed representation, and use allowlists for constrained values. Validation complements output encoding and parameterized APIs.',
    `public class Main {
    static boolean validCode(String value) {
        return value != null && value.matches("[A-Z]{2}-[0-9]{4}");
    }
    public static void main(String[] args) {
        System.out.println(validCode("AB-1204"));
        System.out.println(validCode("../secret"));
    }
}`, 'true\nfalse',
    ['Treat request data, files and environment variables as untrusted inputs.', 'Prefer allowlists for identifiers and enumerated choices.', 'Use type-specific parsers and clear size limits.'],
    'Do not rely on client-side validation; validate again on the server where trust decisions are made.');

  add('security_secure_coding', 'secure_random', 'Secure random number generation',
    'SecureRandom generates values intended to be unpredictable for security-sensitive uses such as tokens and salts.',
    'Unpredictable values reduce the chance that an attacker can guess a session token or cryptographic nonce.',
    'Create a SecureRandom instance and request bytes or bounded values. Follow the requirements of the cryptographic algorithm for uniqueness and nonce size.',
    `import java.security.SecureRandom;

public class Main {
    public static void main(String[] args) {
        byte[] token = new byte[32];
        new SecureRandom().nextBytes(token);
        System.out.println("Token bytes: " + token.length);
    }
}`, 'Token bytes: 32',
    ['Use SecureRandom rather than java.util.Random for security tokens.', 'Use sufficient entropy and token length.', 'Avoid reusing nonces where the algorithm forbids it.'],
    'Do not print or log the generated secret value; display only safe metadata such as its length.');

  add('security_secure_coding', 'hashing_encryption', 'Hashing vs encryption',
    'Hashing transforms input into a digest and is designed to be one-way. Encryption transforms plaintext into ciphertext that can be recovered with the correct key.',
    'The distinction determines how to store passwords, verify integrity or protect data that must later be read.',
    'Use a cryptographic hash for integrity fingerprints, a dedicated password hashing scheme for passwords, and authenticated encryption when data must be decrypted.',
    `import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class Main {
    public static void main(String[] args) throws Exception {
        byte[] digest = MessageDigest.getInstance("SHA-256")
            .digest("Java".getBytes(StandardCharsets.UTF_8));
        System.out.println("SHA-256 bytes: " + digest.length);
    }
}`, 'SHA-256 bytes: 32',
    ['Hashing does not use a decryption key.', 'Encryption is reversible with appropriate key material.', 'A general hash such as SHA-256 is not suitable by itself for password storage.'],
    'Do not encrypt passwords for storage when the application only needs to verify them; use a password-hashing algorithm.');

  add('security_secure_coding', 'password_storage', 'Password storage fundamentals',
    'Password storage should use a password-hashing algorithm designed to be slow and salted, such as PBKDF2, bcrypt, scrypt or Argon2.',
    'A unique salt and expensive derivation make large-scale guessing attacks more difficult if the password database is stolen.',
    'Generate a cryptographically random salt per password, derive a hash with configured work factors, store the algorithm parameters and salt, and compare candidate passwords safely.',
    null, null,
    ['Never store plaintext passwords.', 'Do not use a fast unsalted hash such as plain SHA-256 for passwords.', 'Use a maintained library and current work-factor guidance.'],
    'Do not invent your own password hashing format or reuse one salt for every user.',
    h2('PBKDF2 API shape') + code(`// Use a fresh random salt for every password.
PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, 256);
SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
byte[] derived = factory.generateSecret(spec).getEncoded();
spec.clearPassword();`));

  add('security_secure_coding', 'cryptography_api', 'Cryptography API usage',
    'The Java Cryptography Architecture provides standard APIs for keys, message digests, signatures, random values and ciphers.',
    'Using established provider APIs is safer than implementing cryptographic algorithms by hand.',
    'Choose an authenticated encryption mode such as AES-GCM, generate keys and nonces correctly, and verify authentication before using decrypted data.',
    `import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

public class Main {
    public static void main(String[] args) throws Exception {
        SecretKey key = KeyGenerator.getInstance("AES").generateKey();
        byte[] nonce = new byte[12];
        new SecureRandom().nextBytes(nonce);
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, nonce));
        byte[] encrypted = cipher.doFinal("secret".getBytes(java.nio.charset.StandardCharsets.UTF_8));
        cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(128, nonce));
        byte[] plain = cipher.doFinal(encrypted);
        System.out.println(new String(plain, java.nio.charset.StandardCharsets.UTF_8));
    }
}`, 'secret',
    ['Use authenticated encryption, not encryption without integrity.', 'Never reuse a GCM nonce with the same key.', 'Keep keys in a secret-management system, not in source code.'],
    'Do not hard-code keys or roll your own cipher mode; use standard algorithms and reviewed key management.');

  add('security_secure_coding', 'sql_injection', 'SQL injection prevention with PreparedStatement',
    'SQL injection occurs when untrusted text changes the meaning of a SQL command. PreparedStatement binds values separately from SQL syntax.',
    'Parameter binding prevents a value from being interpreted as SQL code and correctly handles quoting and types.',
    'Write placeholders in the SQL statement, then bind each value using the matching setter. Table and column names cannot be bound as parameters; validate those with an allowlist.',
    null, null,
    ['Never concatenate user values into SQL.', 'Use prepared statements for values.', 'Validate dynamic table or order-by identifiers separately.'],
    'Adding quotes around a concatenated input is not a safe substitute for parameter binding.',
    h2('Safe query shape (requires a database connection)') + code(`String sql = "SELECT id FROM users WHERE email = ?";
try (PreparedStatement statement = connection.prepareStatement(sql)) {
    statement.setString(1, email);
    try (ResultSet results = statement.executeQuery()) {
        while (results.next()) System.out.println(results.getLong("id"));
    }
}`));

  add('security_secure_coding', 'deserialization_risks', 'Deserialization risks',
    'Deserialization reconstructs objects from serialized data. Java native serialization can invoke complex object behavior while reading untrusted input.',
    'Untrusted serialized data may trigger unexpected gadget behavior, excessive resource use or unsafe object graphs.',
    'Prefer simple explicit formats with validation. If native deserialization is unavoidable, restrict accepted classes with ObjectInputFilter and limit graph depth, references and bytes.',
    null, null,
    ['Do not deserialize untrusted Java object streams without strict filters.', 'Use allowlists rather than broad package acceptance.', 'Keep serialization compatibility separate from security trust.'],
    'Do not assume that a signed or encrypted serialized payload is safe unless its origin and key handling are trustworthy.',
    h2('Filter shape') + code(`ObjectInputFilter filter = ObjectInputFilter.Config.createFilter(
    "maxdepth=10;maxrefs=1000;com.example.dto.*;!*"
);
input.setObjectInputFilter(filter);`));

  add('security_secure_coding', 'tls_certificates', 'TLS certificate validation',
    'Certificate validation checks whether a TLS peer certificate chains to a trusted issuer and is valid for the requested host name.',
    'Without validation, an encrypted connection could still be established with an attacker impersonating the intended server.',
    'Use the platform trust store or a deliberately configured trust store. Ensure hostname verification remains enabled and rotate or manage trust anchors carefully.',
    null, null,
    ['Encryption alone does not authenticate the peer.', 'Hostname verification must match the requested host.', 'Certificate failures should be investigated.'],
    'Never use a trust-all TrustManager in production or disable hostname verification to bypass a failure.',
    note('The standard Java HttpClient validates TLS certificates by default using configured trust settings.'));

  add('security_secure_coding', 'secrets_management', 'Secrets management and secure configuration',
    'Secrets are credentials or keys that grant access, such as database passwords, API tokens and private cryptographic keys.',
    'Centralized secret management supports rotation, access control and audit without embedding long-lived credentials in source code.',
    'Load secrets from a protected runtime configuration or secret store, grant each service only the required access, rotate credentials, and avoid logging their values.',
    null, null,
    ['Keep secrets out of source control and build artifacts.', 'Use least privilege and rotation.', 'Redact credentials from logs and exception messages.'],
    'Do not treat an environment variable as encrypted storage; protect the process environment and deployment configuration too.');
})();
