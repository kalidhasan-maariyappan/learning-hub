// Web application security lessons. Every vulnerable example uses fake local data.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, note, table } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const L = (id, title, body) => K.lesson('security_' + id, title, 'Security <span>' + esc(title) + '</span>', body);

  // Spring MVC + Spring Security inside a MockMvc test context: no server or network is used.
  const mockMvcImports = `import org.springframework.context.annotation.*;
import org.springframework.mock.web.MockServletContext;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;`;
  const mockMvcMain = (lines) => `public class Main {
    public static void main(String[] args) throws Exception {
        try (var context = new AnnotationConfigWebApplicationContext()) {
            context.setServletContext(new MockServletContext());
            context.register(WebConfig.class);
            context.refresh();
            MockMvc mvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();

${lines}
        }
    }
}`;

  JT.def('security_home', { title: 'JavaTrail Security', h1: 'JavaTrail <span>Security</span>', body: () => [
    p('This course covers the security problems a Java web developer meets in real projects and is expected to explain in an interview: injection, browser attacks, sessions, authentication, access control and data exposure.'),
    p('Each lesson follows the same steps: what the vulnerability is, why it happens, vulnerable code, the impact, the fix, why the fix works, its limits, and how to test it.'),
    h2('Course map'),
    ...JT.securityGroups.map(([id, title, topics]) => '<h3><a href="' + JT.url('security_group_' + id) + '">' + esc(title) + '</a></h3>' +
      ul(topics.map(([t, tt]) => '<a href="' + JT.url('security_' + t) + '">' + esc(tt) + '</a>'))),
    h2('Before you start'),
    ul(['You should know Java, basic HTTP (methods, headers, cookies, status codes) and basic Spring MVC.',
      'Plain Java examples use <strong>Run here</strong>. Spring examples use <strong>Run with Maven</strong> and run inside a MockMvc test context, so no real server or network is involved.',
      'All data is fake. Do not try these techniques against systems you do not own.']),
  ].join('') });

  K.overview('security_group_browser', 'Injection and Browser Attacks', 'Security <span>Injection and Browser Attacks</span>', [
    p('Injection happens when data is treated as code. Browser attacks abuse the fact that browsers send cookies automatically and run scripts from the page’s origin.'),
    table(['Attack', 'What the attacker controls', 'Main defense'], [
      ['SQL injection', 'Part of an SQL statement', 'Bound parameters'],
      ['XSS', 'Script running in your page', 'Context-aware output encoding, CSP'],
      ['CSRF', 'A request sent by the victim’s browser', 'CSRF token, SameSite cookies'],
      ['Clickjacking', 'A frame around your page', '<code>frame-ancestors</code> / <code>X-Frame-Options</code>'],
    ]),
    p('CORS is in this section because it is often confused with CSRF. CORS is not an attack; it is a browser rule about who may read a response.'),
  ], JT.securityGroups[0][2].map(([t, tt]) => ['security_' + t, tt]));
  K.overview('security_group_identity', 'Sessions and Authentication', 'Security <span>Sessions and Authentication</span>', [
    p('Authentication proves who the caller is. After login, the server must keep that identity safe: in a session cookie or in a token. These lessons cover how that identity is stolen and how to protect it.'),
  ], JT.securityGroups[1][2].map(([t, tt]) => ['security_' + t, tt]));
  K.overview('security_group_access', 'Access Control and Data Protection', 'Security <span>Access Control and Data Protection</span>', [
    p('Broken access control is the most common serious web vulnerability. A user is logged in, but the server does not check that this user may use this record or this file.'),
  ], JT.securityGroups[2][2].map(([t, tt]) => ['security_' + t, tt]));

  // ---------------------------------------------------------------- SQL injection
  L('sql_injection', 'SQL injection', () => [
    h2('What is SQL injection?'),
    p('SQL injection happens when user input becomes part of the <strong>structure</strong> of an SQL statement. The attacker can then change what the query does: read other rows, bypass a login, or modify data.'),
    h2('Why does it happen?'),
    p('It happens when code builds SQL by joining strings. The database cannot tell which part was written by the developer and which part came from the user.'),
    h2('Vulnerable example'),
    p('This program uses an in-memory H2 database. The user searches for a name, but sends a value that contains a quote.'),
    K.spring(`import java.sql.*;

public class Main {
    public static void main(String[] args) throws Exception {
        try (Connection db = DriverManager.getConnection("jdbc:h2:mem:shop")) {
            try (Statement setup = db.createStatement()) {
                setup.execute("CREATE TABLE users(name VARCHAR(20), role VARCHAR(10))");
                setup.execute("INSERT INTO users VALUES ('alice', 'USER'), ('bob', 'ADMIN')");
            }

            String name = "nobody' OR '1'='1";   // value sent by the attacker
            String sql = "SELECT name, role FROM users WHERE name = '" + name + "'";
            System.out.println(sql);

            try (Statement query = db.createStatement(); ResultSet rows = query.executeQuery(sql)) {
                while (rows.next()) {
                    System.out.println(rows.getString("name") + " " + rows.getString("role"));
                }
            }
        }
    }
}`, `SELECT name, role FROM users WHERE name = 'nobody' OR '1'='1'
alice USER
bob ADMIN`, { title: 'String concatenation lets input change the query' }),
    p('The quote in the input closes the string literal. <code>OR \'1\'=\'1\'</code> is always true, so the query returns every user.'),
    h2('The fix: bind parameters'),
    K.spring(`import java.sql.*;

public class Main {
    public static void main(String[] args) throws Exception {
        try (Connection db = DriverManager.getConnection("jdbc:h2:mem:shop")) {
            try (Statement setup = db.createStatement()) {
                setup.execute("CREATE TABLE users(name VARCHAR(20), role VARCHAR(10))");
                setup.execute("INSERT INTO users VALUES ('alice', 'USER'), ('bob', 'ADMIN')");
            }

            String name = "nobody' OR '1'='1";
            String sql = "SELECT name, role FROM users WHERE name = ?";

            try (PreparedStatement query = db.prepareStatement(sql)) {
                query.setString(1, name);
                try (ResultSet rows = query.executeQuery()) {
                    int count = 0;
                    while (rows.next()) count++;
                    System.out.println("Rows found: " + count);
                }
            }
        }
    }
}`, 'Rows found: 0', { title: 'PreparedStatement keeps input as data' }),
    h2('Why does the fix work?'),
    p('With <code>?</code> placeholders, the SQL text is fixed before any user value is added. The value is sent separately and is only ever compared as a string. The database looks for a user literally named <code>nobody\' OR \'1\'=\'1</code>, finds none, and returns zero rows.'),
    h2('Column and table names cannot be bound'),
    p('Placeholders work only for values. If the user chooses a sort column, map their choice to a fixed list of column names.'),
    K.java(`import java.util.Map;

public class Main {
    static final Map<String, String> SORT_COLUMNS = Map.of("name", "name", "created", "created_at");

    static String orderBy(String requested) {
        String column = SORT_COLUMNS.get(requested);
        if (column == null) throw new IllegalArgumentException("Unsupported sort: " + requested);
        return "ORDER BY " + column;
    }

    public static void main(String[] args) {
        System.out.println(orderBy("created"));
        try {
            orderBy("name; DROP TABLE users");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`, `ORDER BY created_at
Unsupported sort: name; DROP TABLE users`, 'Allow-list for dynamic SQL parts'),
    h2('SQL injection in Spring and JPA'),
    p('Spring Data derived queries, <code>JdbcTemplate</code> with <code>?</code>, and JPQL with named parameters are safe. An ORM does not protect you when you build query strings yourself.'),
    K.show(`// Safe: named parameter
@Query("select u from User u where u.email = :email")
Optional<User> findByEmail(@Param("email") String email);

// Safe: JdbcTemplate placeholder
jdbc.queryForList("select * from orders where status = ?", status);

// Vulnerable: JPQL built from input
em.createQuery("select u from User u where u.email = '" + email + "'");

// Vulnerable: native query built from input
em.createNativeQuery("select * from orders order by " + sortParam);`, 'Safe and unsafe Spring/JPA queries', 'java'),
    h2('Important points'),
    ul(['Use bound parameters for every value, including values that “come from our own database” (second-order injection).',
      'Use an allow-list for column names, sort direction and table names.',
      'Give the application database user only the permissions it needs. It should not be able to drop tables.',
      'Input validation helps, but it is not the fix. Parameters are the fix.']),
    h2('How to test it'),
    p('Write a repository or integration test that sends <code>\' OR \'1\'=\'1</code> and a value with <code>;</code> and <code>--</code>. Assert that the query returns no extra rows and does not fail with an SQL syntax error. A syntax error on a quote is a strong sign of concatenation.'),
    K.interview([
      ['Why does PreparedStatement prevent SQL injection?', 'The SQL structure is parsed with placeholders before values are supplied. Values are sent as parameters and are never parsed as SQL, so they cannot add operators or clauses.'],
      ['Can you bind a column name or ORDER BY direction?', 'No. Placeholders are for values only. Map user choices to a fixed allow-list of column names and <code>ASC</code>/<code>DESC</code>.'],
      ['Is an application using Hibernate safe from SQL injection?', 'Not automatically. String-built JPQL/HQL, native queries, and <code>ORDER BY</code> built from input are still injectable. Use parameters and allow-lists.'],
      ['What is second-order SQL injection?', 'Malicious input is stored safely, then later read back and concatenated into another query. Treat database values as untrusted when building SQL too.'],
      ['Does escaping quotes work instead?', 'It is fragile: it depends on the database, character encoding and context, and it is easy to forget once. Use bound parameters.'],
    ]),
  ]);

  // ---------------------------------------------------------------- XSS
  L('xss', 'Cross-site scripting (XSS)', () => [
    h2('What is XSS?'),
    p('Cross-site scripting (XSS) happens when an attacker gets their JavaScript to run inside your web page. The script runs with your site’s origin, so it can read the page, call your APIs as the user, and change what the user sees.'),
    table(['Type', 'Where the script comes from'], [
      ['Stored', 'Saved in the database (a comment, a profile name) and shown to other users'],
      ['Reflected', 'Taken from the request (for example a search parameter) and echoed in the response'],
      ['DOM-based', 'Front-end JavaScript writes untrusted data into the page, for example with <code>innerHTML</code>'],
    ]),
    h2('Why does it happen?'),
    p('It happens when untrusted text is inserted into HTML without encoding. The browser cannot tell the developer’s HTML from the user’s text.'),
    h2('Vulnerable example'),
    K.java(`public class Main {
    public static void main(String[] args) {
        String comment = "<script>sendToAttacker(document.cookie)</script>";
        String html = "<p class=\\"comment\\">" + comment + "</p>";
        System.out.println(html);
    }
}`, '<p class="comment"><script>sendToAttacker(document.cookie)</script></p>', 'Building HTML by concatenation'),
    p('If this HTML is sent to a browser, the <code>&lt;script&gt;</code> tag runs for every user who views the comment.'),
    h2('The fix: encode output for its context'),
    K.java(`public class Main {
    static String escapeHtml(String text) {
        StringBuilder out = new StringBuilder();
        for (char c : text.toCharArray()) {
            switch (c) {
                case '<' -> out.append("&lt;");
                case '>' -> out.append("&gt;");
                case '&' -> out.append("&amp;");
                case '"' -> out.append("&quot;");
                case '\\'' -> out.append("&#x27;");
                default -> out.append(c);
            }
        }
        return out.toString();
    }

    public static void main(String[] args) {
        String comment = "<script>sendToAttacker(document.cookie)</script>";
        System.out.println("<p class=\\"comment\\">" + escapeHtml(comment) + "</p>");
    }
}`, '<p class="comment">&lt;script&gt;sendToAttacker(document.cookie)&lt;/script&gt;</p>', 'HTML-encode untrusted text'),
    h2('Why does the fix work?'),
    p('After encoding, <code>&lt;</code> becomes <code>&amp;lt;</code>. The browser displays the characters as text instead of starting a tag. This example shows the idea; in real code use your template engine’s escaping or a library such as the OWASP Java Encoder instead of writing your own.'),
    h2('What to use in real applications'),
    table(['Technology', 'Safe by default', 'Dangerous'], [
      ['Thymeleaf', '<code>th:text</code>', '<code>th:utext</code>'],
      ['JSP', '<code>&lt;c:out&gt;</code>, <code>fn:escapeXml</code>', '<code>${value}</code> printed directly'],
      ['React', '<code>{value}</code>', '<code>dangerouslySetInnerHTML</code>'],
      ['Plain JavaScript', '<code>element.textContent = value</code>', '<code>element.innerHTML = value</code>'],
    ]),
    p('Encoding depends on the context. HTML text, an HTML attribute, a JavaScript string and a URL each need different encoding. A URL must also be checked so it cannot be <code>javascript:...</code>.'),
    h2('Defense in depth: Content Security Policy'),
    p('A Content Security Policy (CSP) tells the browser which scripts it may run. A strict CSP blocks inline scripts, so many XSS payloads fail even if encoding is missed somewhere.'),
    K.show(`http.headers(headers -> headers
    .contentSecurityPolicy(csp -> csp
        .policyDirectives("default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'")));`, 'Spring Security: add a CSP header', 'java'),
    h2('Important points'),
    ul(['Encode on output, in the right context. Input validation alone does not stop XSS.',
      'If users may submit rich HTML, sanitize it with an allow-list sanitizer (for example the OWASP Java HTML Sanitizer).',
      'HttpOnly cookies stop scripts from reading the session cookie, but the script can still send requests as the user. HttpOnly limits damage; it does not prevent XSS.',
      'Return JSON with <code>Content-Type: application/json</code> and <code>X-Content-Type-Options: nosniff</code>, so a browser never renders an API response as HTML.']),
    h2('How to test it'),
    p('Save a value such as <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> or <code>&lt;img src=x onerror=alert(1)&gt;</code>, then load every page that displays it. In an automated test, assert that the response body contains the encoded form (<code>&amp;lt;script&amp;gt;</code>) and not the raw tag.'),
    K.interview([
      ['What is the difference between stored, reflected and DOM-based XSS?', 'Stored XSS is saved on the server and served to other users. Reflected XSS is echoed from the current request. DOM-based XSS happens entirely in front-end code that writes untrusted data into the DOM.'],
      ['Is input validation enough to prevent XSS?', 'No. The same data may be safe in one context and dangerous in another. Encode at output time for the exact context, and use validation as an extra layer.'],
      ['Does an HttpOnly cookie prevent XSS?', 'No. It prevents JavaScript from reading that cookie. Injected script can still read the page and call APIs with the user’s cookies attached.'],
      ['How does CSP help?', 'It restricts which scripts the browser may execute, for example only scripts from your origin or with a nonce. Inline injected scripts are blocked. It is a second layer, not a replacement for encoding.'],
      ['Why is <code>innerHTML</code> risky and <code>textContent</code> safe?', '<code>innerHTML</code> parses the string as HTML, so tags and event handlers become active. <code>textContent</code> inserts plain text.'],
    ]),
  ]);

  // ---------------------------------------------------------------- CSRF
  L('csrf', 'Cross-site request forgery (CSRF)', () => [
    h2('What is CSRF?'),
    p('Cross-site request forgery (CSRF) tricks a logged-in user’s browser into sending a request the user did not intend, such as a money transfer or a password change.'),
    h2('Why does it happen?'),
    p('Browsers attach cookies automatically to requests sent to a site, even when another site started the request. If the server trusts the session cookie alone, it cannot tell a real request from a forged one.'),
    h2('The attack'),
    p('The user is logged in to <code>bank.example</code>. They visit the attacker’s page, which contains this form. The browser submits it and attaches the bank session cookie.'),
    K.show(`<form action="https://bank.example/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="1000">
</form>
<script>document.forms[0].submit();</script>`, 'Attacker page (HTML)'),
    p('The attacker never sees the response. They do not need it: the transfer has already happened.'),
    h2('The fix: a CSRF token'),
    p('The server gives the real page a secret random token and requires it on every state-changing request. The attacker’s page cannot read that token, so it cannot send it. Spring Security enables this protection by default.'),
    K.spring(mockMvcImports + `

@RestController
class TransferController {
    @PostMapping("/transfer")
    String transfer() { return "Transfer done"; }
}

@Configuration
@EnableWebMvc
@EnableWebSecurity
@ComponentScan
class WebConfig {
    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .formLogin(Customizer.withDefaults())
            .build();   // CSRF protection is on by default
    }

    @Bean
    UserDetailsService users() {
        return new InMemoryUserDetailsManager(
            User.withUsername("alice").password("{noop}secret").roles("USER").build());
    }
}

` + mockMvcMain(`            int forged = mvc.perform(post("/transfer").with(user("alice")))
                            .andReturn().getResponse().getStatus();
            int real = mvc.perform(post("/transfer").with(user("alice")).with(csrf()))
                          .andReturn().getResponse().getStatus();
            System.out.println("Logged-in POST without CSRF token: " + forged);
            System.out.println("Logged-in POST with CSRF token: " + real);`),
    `Logged-in POST without CSRF token: 403
Logged-in POST with CSRF token: 200`, { title: 'Spring Security rejects a request without the token' }),
    h2('How does it work?'),
    ul(['Both requests are from the logged-in user <code>alice</code>, just like a forged request would be.',
      'The first request has no token, so <code>CsrfFilter</code> rejects it with 403 Forbidden.',
      '<code>.with(csrf())</code> adds a valid token, as a real form or front-end would, so the request reaches the controller.',
      'Thymeleaf forms rendered by Spring include the token automatically as a hidden <code>_csrf</code> field.']),
    h2('Other layers'),
    table(['Control', 'What it does', 'Limit'], [
      ['SameSite cookie', '<code>Lax</code> or <code>Strict</code> stops the browser sending the cookie on cross-site POSTs', 'Sibling subdomains count as the same site; <code>Lax</code> still sends cookies on top-level GET navigations'],
      ['Safe GET', 'GET requests never change state', 'Required for the token approach to be complete'],
      ['Origin check', 'Reject state-changing requests with an unexpected <code>Origin</code> header', 'Useful extra check, not the main control'],
    ]),
    h2('When can CSRF protection be disabled?'),
    p('Only when the browser does <strong>not</strong> send credentials automatically. A stateless API that reads a token from the <code>Authorization: Bearer</code> header is not exposed to CSRF, because an attacker’s page cannot make the browser add that header. If you store a JWT in a cookie, the browser sends it automatically and you need CSRF protection again.'),
    p('For a single-page application that uses a session cookie, keep CSRF on and use <code>CookieCsrfTokenRepository.withHttpOnlyFalse()</code>. The front-end reads the <code>XSRF-TOKEN</code> cookie and sends it in the <code>X-XSRF-TOKEN</code> header.'),
    h2('How to test it'),
    p('Keep a MockMvc test like the example: a state-changing request from an authenticated user without a token must return 403. This catches someone disabling CSRF by mistake.'),
    K.interview([
      ['What is the difference between CSRF and XSS?', 'CSRF makes the victim’s browser send a request from another site; the attacker cannot read the response. XSS runs the attacker’s script inside your site, so it can read pages and send requests. XSS also defeats CSRF tokens because the script can read them.'],
      ['Why doesn’t CORS protect against CSRF?', 'CORS controls whether a cross-origin script can read a response. A plain HTML form POST is sent without a preflight, and the server still processes it. The damage is done even though the attacker cannot read the result.'],
      ['When is it acceptable to disable CSRF in Spring Security?', 'For stateless APIs where authentication comes only from a header such as <code>Authorization: Bearer</code>, not from cookies. Never disable it for cookie-based sessions.'],
      ['Does SameSite=Lax fully prevent CSRF?', 'It blocks most cross-site POSTs, but not requests from a sibling subdomain (same site), not state-changing GET endpoints, and older clients may ignore it. Use it with tokens.'],
      ['Why must GET requests not change state?', 'GET requests can be triggered by links, images and top-level navigation, often with cookies attached even with SameSite=Lax, and CSRF protection usually does not check them.'],
    ]),
  ]);

  // ---------------------------------------------------------------- CORS
  L('cors', 'CORS', () => [
    h2('What is CORS?'),
    p('Cross-Origin Resource Sharing (CORS) is a browser rule that lets a server say which other origins may <strong>read</strong> its responses from JavaScript. An origin is the combination of scheme, host and port: <code>https://app.example.com</code> and <code>https://api.example.com</code> are different origins.'),
    h2('Why is it needed?'),
    p('By default, the browser’s same-origin policy stops JavaScript on one origin from reading responses from another. When your front-end on <code>https://app.example.com</code> calls your API on <code>https://api.example.com</code>, the API must send CORS headers to allow it.'),
    h2('Preflight requests'),
    p('For requests that are not “simple”, such as <code>PUT</code>, <code>DELETE</code>, a JSON body or a custom header, the browser first sends an <code>OPTIONS</code> request asking for permission. This is called a preflight.'),
    K.show(`OPTIONS /api/orders/1
Origin: https://app.example.com
Access-Control-Request-Method: PUT

HTTP/1.1 200
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET,POST,PUT
Access-Control-Allow-Credentials: true`, 'A preflight and an allowing response'),
    h2('Example: allow only your front-end'),
    K.spring(`import org.springframework.context.annotation.*;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.config.annotation.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;

@RestController
class OrderController {
    @PutMapping("/api/orders/1")
    String update() { return "updated"; }
}

@Configuration
@EnableWebMvc
@ComponentScan
class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://app.example.com")
                .allowedMethods("GET", "POST", "PUT")
                .allowCredentials(true);
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        try (var context = new AnnotationConfigWebApplicationContext()) {
            context.setServletContext(new MockServletContext());
            context.register(WebConfig.class);
            context.refresh();
            MockMvc mvc = MockMvcBuilders.webAppContextSetup(context).build();

            for (String origin : new String[] {"https://app.example.com", "https://evil.example"}) {
                MvcResult result = mvc.perform(options("/api/orders/1")
                        .header("Origin", origin)
                        .header("Access-Control-Request-Method", "PUT"))
                    .andReturn();
                System.out.println(origin + " -> " + result.getResponse().getStatus()
                    + ", Allow-Origin: " + result.getResponse().getHeader("Access-Control-Allow-Origin"));
            }
        }
    }
}`, `https://app.example.com -> 200, Allow-Origin: https://app.example.com
https://evil.example -> 403, Allow-Origin: null`, { title: 'Spring MVC CORS configuration' }),
    h2('How does it work?'),
    ul(['<code>addMapping("/api/**")</code> applies the rule to API paths only.',
      'The preflight from the allowed origin gets 200 and an <code>Access-Control-Allow-Origin</code> header naming that origin.',
      'The preflight from another origin gets 403 and no allow header, so the browser blocks the real request.',
      'With Spring Security, call <code>http.cors(Customizer.withDefaults())</code> so preflight requests are handled before authentication (preflights carry no credentials).']),
    h2('Common misconfigurations'),
    ul(['<strong>Reflecting any Origin</strong> with <code>allowCredentials(true)</code>. Any website can then read the user’s data with their cookies. This is the most serious CORS mistake.',
      '<strong><code>"*"</code> with credentials.</strong> Browsers refuse this combination, and Spring throws an <code>IllegalArgumentException</code>. Teams then “fix” it by reflecting the origin, which is worse.',
      '<strong>Weak pattern matching</strong>, such as allowing every origin that ends with <code>example.com</code>, which also matches <code>evil-example.com</code>.',
      '<strong>Trusting the <code>null</code> origin</strong>, which sandboxed iframes and local files can send.']),
    h2('Important points'),
    ul(['CORS is enforced by the browser. It does not protect your server: <code>curl</code>, Postman and other servers ignore it. You still need authentication and authorization.',
      'CORS is not CSRF protection. A cross-site form POST is sent and processed without any CORS check.',
      'List exact origins for each environment in configuration.']),
    K.interview([
      ['Is CORS a server-side security control?', 'No. It is a browser mechanism that relaxes the same-origin policy. Non-browser clients ignore it, so every endpoint still needs authentication and authorization.'],
      ['What triggers a preflight request?', 'Methods other than GET/HEAD/POST, a <code>Content-Type</code> other than form or plain-text types (for example <code>application/json</code>), or custom headers such as <code>Authorization</code>.'],
      ['Why can’t you use <code>Access-Control-Allow-Origin: *</code> with credentials?', 'The specification forbids it, because it would let any site read authenticated responses. You must name the exact origin.'],
      ['A front-end gets a CORS error but the server log shows the request. Why?', 'For a simple request, the browser sends it and the server processes it; the browser only blocks JavaScript from reading the response. For preflighted requests, check that the OPTIONS request is allowed before authentication.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Security headers
  L('security_headers', 'Security headers and clickjacking', () => [
    h2('What are security headers?'),
    p('Security headers are HTTP response headers that tell the browser to turn on protections: do not guess content types, do not show this page in a frame, only use HTTPS, and only run approved scripts.'),
    h2('Why are they used?'),
    p('They reduce the damage of mistakes. For example, if your page can be shown in an invisible frame, an attacker can trick users into clicking your buttons (clickjacking).'),
    h2('Example: Spring Security defaults'),
    K.spring(mockMvcImports + `
import org.springframework.mock.web.MockHttpServletResponse;

@RestController
class InfoController {
    @GetMapping("/info")
    String info() { return "ok"; }
}

@Configuration
@EnableWebMvc
@EnableWebSecurity
@ComponentScan
class WebConfig {
    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll()).build();
    }
}

` + mockMvcMain(`            MockHttpServletResponse response = mvc.perform(get("/info")).andReturn().getResponse();
            for (String name : new String[] {"X-Content-Type-Options", "X-Frame-Options", "Cache-Control", "X-XSS-Protection"}) {
                System.out.println(name + ": " + response.getHeader(name));
            }`),
    `X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
X-XSS-Protection: 0`, { title: 'Headers added by Spring Security' }),
    h2('What each header does'),
    table(['Header', 'Purpose'], [
      ['<code>X-Content-Type-Options: nosniff</code>', 'The browser must use the declared content type and not guess. Stops a JSON or text response from being run as HTML or script.'],
      ['<code>X-Frame-Options: DENY</code>', 'The page may not be shown in a frame. This blocks clickjacking. The modern equivalent is CSP <code>frame-ancestors \'none\'</code>.'],
      ['<code>Cache-Control: no-store …</code>', 'Responses with personal data are not stored by the browser or shared caches. Spring Security sets this by default; allow caching for static assets explicitly.'],
      ['<code>X-XSS-Protection: 0</code>', 'Turns off an old browser XSS filter that caused its own problems. Use CSP instead.'],
      ['<code>Strict-Transport-Security</code>', 'HSTS: the browser uses only HTTPS for this site from now on. Spring Security adds it only to HTTPS responses, which is why it is missing in this HTTP test.'],
      ['<code>Content-Security-Policy</code>', 'Controls where scripts, styles, frames and other resources may load from. Not added by default because it must match your application.'],
    ]),
    h2('Adding CSP and Referrer-Policy'),
    K.show(`http.headers(headers -> headers
    .contentSecurityPolicy(csp -> csp.policyDirectives(
        "default-src 'self'; frame-ancestors 'none'; object-src 'none'"))
    .referrerPolicy(referrer -> referrer.policy(
        ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)));`, 'Extra headers', 'java'),
    h2('Important points'),
    ul(['Do not disable the default headers to “fix” a problem. If one page must be framed by your own site, use <code>sameOrigin()</code> for that case.',
      'Roll out CSP with <code>Content-Security-Policy-Report-Only</code> first to find what would break.',
      'If TLS ends at a load balancer, configure forwarded headers so the application knows the request was HTTPS.']),
    h2('How to test it'),
    p('Add an integration test that asserts the important headers are present on a normal response, as the example does.'),
    K.interview([
      ['What is clickjacking and how do you prevent it?', 'An attacker loads your page in a transparent frame and tricks the user into clicking it. Prevent it with <code>X-Frame-Options: DENY</code> or CSP <code>frame-ancestors</code>.'],
      ['What does HSTS protect against?', 'SSL-stripping: after the first visit, the browser refuses plain HTTP for the site, so an attacker on the network cannot downgrade the connection.'],
      ['Why does Spring Security send X-XSS-Protection: 0?', 'The old browser XSS auditor was removed from browsers and could itself be abused. Disabling it is the current recommendation; CSP is the replacement.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Session fixation
  L('session_fixation', 'Session fixation and session ID protection', () => [
    h2('What is session fixation?'),
    p('In a session fixation attack, the attacker gets a session ID first and makes the victim use it. If the server keeps the same ID after the victim logs in, the attacker’s copy of that ID is now logged in as the victim.'),
    h2('Why does it happen?'),
    p('It happens when the server attaches the logged-in user to the existing session instead of creating a new session ID at login.'),
    h2('Example'),
    p('This plain Java program models a server’s session store, so you can see the problem without a browser.'),
    K.java(`import java.security.SecureRandom;
import java.util.*;

class SessionStore {
    private final Map<String, String> users = new HashMap<>();
    private final SecureRandom random = new SecureRandom();

    String newSession() {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String id = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        users.put(id, "anonymous");
        return id;
    }

    // Vulnerable: the session ID stays the same after login.
    void loginKeepingId(String id, String user) {
        users.put(id, user);
    }

    // Fixed: remove the old ID and issue a new one.
    String loginWithNewId(String oldId, String user) {
        users.remove(oldId);
        String newId = newSession();
        users.put(newId, user);
        return newId;
    }

    String userFor(String id) {
        return users.getOrDefault(id, "no session");
    }
}

public class Main {
    public static void main(String[] args) {
        SessionStore store = new SessionStore();

        String attackerId = store.newSession();      // attacker plants this ID in the victim's browser
        store.loginKeepingId(attackerId, "alice");   // victim logs in
        System.out.println("Vulnerable: attacker's ID now belongs to " + store.userFor(attackerId));

        String plantedId = store.newSession();
        String aliceId = store.loginWithNewId(plantedId, "alice");
        System.out.println("Fixed: attacker's ID now belongs to " + store.userFor(plantedId));
        System.out.println("Fixed: alice's new ID belongs to " + store.userFor(aliceId));
    }
}`, `Vulnerable: attacker's ID now belongs to alice
Fixed: attacker's ID now belongs to no session
Fixed: alice's new ID belongs to alice`, 'Simulating session fixation'),
    h2('How does it work?'),
    ul(['<code>SecureRandom</code> creates 32 random bytes, so session IDs cannot be guessed.',
      'In the vulnerable login, the planted ID is linked to <code>alice</code>, so the attacker can use it.',
      'In the fixed login, the old ID is removed and a new one is issued. The attacker’s ID no longer works.']),
    h2('What Spring Security does'),
    p('Spring Security protects against session fixation by default. On login, it calls the Servlet <code>changeSessionId()</code> method, which keeps the session attributes but gives the session a new ID. You can make the setting explicit:'),
    K.show(`http.sessionManagement(session -> session
    .sessionFixation(fixation -> fixation.changeSessionId())   // default
    .maximumSessions(1));                                      // optional: one login per user`, 'Spring Security session settings', 'java'),
    h2('Protecting the session cookie'),
    K.show(`server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.secure=true
server.servlet.session.cookie.same-site=lax
server.servlet.session.timeout=30m
server.servlet.session.tracking-modes=cookie`, 'Spring Boot application.properties'),
    table(['Setting', 'Why'], [
      ['<code>HttpOnly</code>', 'JavaScript cannot read the cookie, so an XSS bug cannot copy the session ID.'],
      ['<code>Secure</code>', 'The cookie is only sent over HTTPS, so it is not visible on the network.'],
      ['<code>SameSite=Lax</code>', 'The cookie is not sent on most cross-site requests. Helps against CSRF.'],
      ['Timeout', 'An abandoned session stops working.'],
      ['<code>tracking-modes=cookie</code>', 'Never put the session ID in the URL (<code>;jsessionid=</code>), where it leaks into logs, browser history and the <code>Referer</code> header.'],
    ]),
    h2('Important points'),
    ul(['Issue a new session ID at login and whenever privileges change (for example after step-up authentication).',
      'On logout, invalidate the session on the server and delete the cookie. Deleting only the cookie is not enough.',
      'Never log session IDs or tokens.']),
    h2('How to test it'),
    p('In a browser’s developer tools, note the <code>JSESSIONID</code> cookie before login and check that it changes after login. In an integration test with a real HTTP client, assert the same thing. After logout, the old ID must no longer be accepted.'),
    K.interview([
      ['What is session fixation and how does Spring prevent it?', 'The attacker makes the victim use a known session ID before login. Spring Security changes the session ID on authentication using <code>changeSessionId()</code>, so the known ID becomes useless.'],
      ['Session fixation vs session hijacking?', 'Fixation: the attacker sets the ID before login. Hijacking: the attacker steals an existing authenticated ID, for example through XSS, network sniffing or logs.'],
      ['Which cookie attributes should a session cookie have?', '<code>HttpOnly</code>, <code>Secure</code>, a suitable <code>SameSite</code> value, a narrow <code>Path</code>, and no long-lived expiry.'],
      ['How do you make logout secure?', 'Invalidate the server-side session, clear the security context, delete the cookie, and for token systems revoke the refresh token.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Password hashing
  L('password_hashing', 'Password hashing', () => [
    h2('What is password hashing?'),
    p('Password hashing turns a password into a one-way value that is stored instead of the password. At login, the server hashes the entered password the same way and compares the results. The original password cannot be recovered from the hash.'),
    h2('Why not use SHA-256?'),
    p('General-purpose hashes like SHA-256 are designed to be fast. An attacker who steals the table can try billions of guesses per second. Without a salt, equal passwords also have equal hashes.'),
    K.java(`import java.security.MessageDigest;
import java.util.HexFormat;

public class Main {
    static String sha256(String text) throws Exception {
        byte[] hash = MessageDigest.getInstance("SHA-256").digest(text.getBytes("UTF-8"));
        return HexFormat.of().formatHex(hash);
    }

    public static void main(String[] args) throws Exception {
        String aliceHash = sha256("password123");
        String bobHash = sha256("password123");
        System.out.println("Same hash for two users: " + aliceHash.equals(bobHash));
    }
}`, 'Same hash for two users: true', 'Problem: fast, unsalted hashes'),
    h2('The fix: a password-hashing algorithm'),
    p('Use an algorithm designed for passwords: <strong>BCrypt</strong>, <strong>Argon2</strong>, <strong>scrypt</strong> or <strong>PBKDF2</strong>. They add a random salt to every hash and are deliberately slow, with a configurable cost.'),
    K.spring(`import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

public class Main {
    public static void main(String[] args) {
        PasswordEncoder bcrypt = new BCryptPasswordEncoder();

        String first = bcrypt.encode("s3cret!");
        String second = bcrypt.encode("s3cret!");

        System.out.println("Prefix: " + first.substring(0, 7));
        System.out.println("Same password, same hash? " + first.equals(second));
        System.out.println("Correct password matches: " + bcrypt.matches("s3cret!", first));
        System.out.println("Wrong password matches: " + bcrypt.matches("guess", first));

        PasswordEncoder delegating = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        System.out.println("Stored format: " + delegating.encode("s3cret!").substring(0, 15));
    }
}`, `Prefix: $2a$10$
Same password, same hash? false
Correct password matches: true
Wrong password matches: false
Stored format: {bcrypt}$2a$10$`, { title: 'BCrypt with Spring Security' }),
    h2('How does it work?'),
    ul(['<code>$2a$10$</code> means BCrypt version 2a with cost 10 (2<sup>10</sup> rounds). The salt and the hash follow in the same string.',
      'Each call to <code>encode()</code> uses a new random salt, so the two hashes differ.',
      '<code>matches()</code> reads the salt and cost from the stored hash, hashes the input the same way and compares the results.',
      'The delegating encoder stores an ID such as <code>{bcrypt}</code>. Later you can change the default algorithm and still verify old hashes, then upgrade them when users log in.']),
    h2('Hashing vs encryption vs encoding'),
    table(['', 'Reversible?', 'Use for'], [
      ['Encoding (Base64)', 'Yes, by anyone', 'Representing bytes as text. Not security.'],
      ['Encryption (AES)', 'Yes, with the key', 'Data you must read again, such as a stored API key'],
      ['Password hashing (BCrypt)', 'No', 'Passwords'],
    ]),
    h2('Important points'),
    ul(['Never store passwords in plaintext, with encryption, or with MD5/SHA-1/SHA-256 alone.',
      'Choose a cost that takes roughly a few hundred milliseconds on your servers, and review it as hardware improves.',
      'BCrypt uses at most 72 bytes of input. Enforce a sensible maximum password length.',
      'Also rate-limit login attempts, support multi-factor authentication, and use generic error messages (“invalid username or password”).']),
    K.interview([
      ['Why is a salt needed?', 'A unique random salt makes equal passwords produce different hashes, and makes precomputed tables (rainbow tables) useless. Attackers must attack each hash separately.'],
      ['Why should password hashing be slow?', 'Users log in rarely, so 100–300 ms is acceptable. An attacker needs billions of guesses, so slowness multiplies their cost.'],
      ['How do you migrate users from SHA-256 hashes to BCrypt?', 'Use a <code>DelegatingPasswordEncoder</code>: verify the old format, and on successful login re-hash with BCrypt. Optionally wrap old hashes (BCrypt of the SHA-256 value) to protect them immediately.'],
      ['What is a pepper?', 'A secret value added to all passwords and stored outside the database (for example in a secrets manager). It helps if only the database leaks. It is optional and needs key management.'],
    ]),
  ]);

  // ---------------------------------------------------------------- AuthN vs AuthZ
  L('authn_authz', 'Authentication vs authorization in Spring Security', () => [
    h2('What is the difference?'),
    p('<strong>Authentication</strong> answers “who are you?” — for example by checking a password or a token. <strong>Authorization</strong> answers “are you allowed to do this?” — for example by checking a role.'),
    table(['', 'Authentication', 'Authorization'], [
      ['Question', 'Who is the caller?', 'May this caller do this?'],
      ['Failure status', '401 Unauthorized', '403 Forbidden'],
      ['Spring Security part', 'Authentication filters, <code>AuthenticationManager</code>', '<code>AuthorizationFilter</code>, <code>@PreAuthorize</code>'],
    ]),
    h2('How Spring Security processes a request'),
    ol(['A servlet filter (<code>DelegatingFilterProxy</code>) passes the request to Spring’s <code>FilterChainProxy</code>.',
      '<code>FilterChainProxy</code> chooses the first <code>SecurityFilterChain</code> that matches the request.',
      'The chain runs filters in order: load the security context, check CSRF, try authentication (form login, HTTP Basic, bearer token), then <code>ExceptionTranslationFilter</code> and <code>AuthorizationFilter</code>.',
      'If the user is not authenticated, the result is a login prompt or 401. If they are authenticated but not allowed, the result is 403.']),
    h2('Example'),
    K.spring(mockMvcImports + `

@RestController
class Api {
    @GetMapping("/public/info") String info() { return "public"; }
    @GetMapping("/api/orders") String orders() { return "orders"; }
    @GetMapping("/admin/report") String report() { return "report"; }
}

@Configuration
@EnableWebMvc
@EnableWebSecurity
@ComponentScan
class WebConfig {
    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())
            .build();
    }

    @Bean
    UserDetailsService users() {
        return new InMemoryUserDetailsManager(
            User.withUsername("alice").password("{noop}secret").roles("USER").build());
    }
}

` + mockMvcMain(`            System.out.println("Public, anonymous: "
                + mvc.perform(get("/public/info")).andReturn().getResponse().getStatus());
            System.out.println("Orders, anonymous: "
                + mvc.perform(get("/api/orders")).andReturn().getResponse().getStatus());
            System.out.println("Orders, alice: "
                + mvc.perform(get("/api/orders").with(httpBasic("alice", "secret"))).andReturn().getResponse().getStatus());
            System.out.println("Admin, alice (USER): "
                + mvc.perform(get("/admin/report").with(httpBasic("alice", "secret"))).andReturn().getResponse().getStatus());`),
    `Public, anonymous: 200
Orders, anonymous: 401
Orders, alice: 200
Admin, alice (USER): 403`, { title: 'Each request gets a different result' }),
    h2('How does it work?'),
    ul(['Rules in <code>authorizeHttpRequests</code> are checked from top to bottom; the first match wins. Put specific paths before <code>anyRequest()</code>.',
      'An anonymous request to <code>/api/orders</code> is not authenticated, so HTTP Basic responds with 401.',
      '<code>alice</code> has a valid password, so she is authenticated and can see orders.',
      '<code>alice</code> has role <code>USER</code>, not <code>ADMIN</code>, so <code>/admin/report</code> returns 403.',
      '<code>{noop}</code> means the password is stored in plaintext. It is only for a demo; real users need a hashed password.']),
    h2('Method security'),
    p('URL rules protect endpoints. For rules that depend on the data, also protect service methods:'),
    K.show(`@Configuration
@EnableMethodSecurity
class MethodSecurityConfig { }

@Service
class ReportService {
    @PreAuthorize("hasRole('ADMIN')")
    Report monthlyReport() { ... }

    @PreAuthorize("#username == authentication.name")
    List<Order> ordersFor(String username) { ... }
}`, 'Method-level authorization', 'java'),
    h2('Important points'),
    ul(['<code>hasRole("ADMIN")</code> checks for the authority <code>ROLE_ADMIN</code>. <code>hasAuthority("orders:read")</code> checks the exact name.',
      'Deny by default: end with <code>anyRequest().authenticated()</code> or <code>denyAll()</code>.',
      'Being authenticated does not mean being allowed to see a specific record. See the IDOR lesson.']),
    K.interview([
      ['What is the difference between 401 and 403?', '401 means the request has no valid authentication. 403 means the caller is authenticated (or authentication would not help) but is not allowed.'],
      ['Explain the Spring Security filter chain.', '<code>DelegatingFilterProxy</code> bridges the servlet container to <code>FilterChainProxy</code>, which picks a matching <code>SecurityFilterChain</code>. Its ordered filters load the context, handle CSRF and authentication, translate security exceptions, and finally authorize the request.'],
      ['Role vs authority?', 'An authority is any granted permission string. A role is an authority with the <code>ROLE_</code> prefix; <code>hasRole</code> adds the prefix for you.'],
      ['Where is the authenticated user stored?', 'In the <code>SecurityContext</code>, held by <code>SecurityContextHolder</code> (thread-local by default). For sessions it is saved in the HTTP session between requests.'],
      ['URL security or method security?', 'Use both. URL rules are a coarse first layer. Method security protects services from every entry point and can use method arguments.'],
    ]),
  ]);

  // ---------------------------------------------------------------- JWT
  L('jwt', 'JWT security', () => [
    h2('What is a JWT?'),
    p('A JSON Web Token (JWT) is a signed string with three Base64URL parts: <code>header.payload.signature</code>. The payload holds claims such as the user name (<code>sub</code>) and expiry time (<code>exp</code>). The signature proves the token was issued by someone who has the key and was not changed.'),
    h2('Why are JWTs risky?'),
    p('A JWT is only trustworthy after the server checks its signature, algorithm and claims. Common mistakes are trusting the payload without verifying, accepting <code>alg: none</code>, and not checking expiry. The payload is encoded, not encrypted: anyone can read it.'),
    h2('Example: verify before trusting'),
    p('This plain Java example creates and verifies an HS256 token with the JDK’s HMAC support. It only shows the checks; in an application, use Spring Security’s resource server.'),
    K.java(`import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.util.Base64;

public class Main {
    static final byte[] KEY = "demo-key-that-is-at-least-32-bytes-long!".getBytes();
    static final Base64.Encoder B64 = Base64.getUrlEncoder().withoutPadding();

    static String sign(String data) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(KEY, "HmacSHA256"));
        return B64.encodeToString(mac.doFinal(data.getBytes()));
    }

    static String token(String header, String payload) throws Exception {
        String data = B64.encodeToString(header.getBytes()) + "." + B64.encodeToString(payload.getBytes());
        return data + "." + sign(data);
    }

    static String verify(String token, long now) throws Exception {
        String[] parts = token.split("\\\\.", -1);
        if (parts.length != 3) return "rejected: malformed";
        String header = new String(Base64.getUrlDecoder().decode(parts[0]));
        if (!header.contains("\\"alg\\":\\"HS256\\"")) return "rejected: unexpected algorithm";
        byte[] expected = sign(parts[0] + "." + parts[1]).getBytes();
        if (!MessageDigest.isEqual(expected, parts[2].getBytes())) return "rejected: bad signature";
        String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
        long exp = Long.parseLong(payload.replaceAll(".*\\"exp\\":(\\\\d+).*", "$1"));
        if (now >= exp) return "rejected: expired";
        return "accepted: " + payload;
    }

    public static void main(String[] args) throws Exception {
        String hs256 = "{\\"alg\\":\\"HS256\\",\\"typ\\":\\"JWT\\"}";
        String good = token(hs256, "{\\"sub\\":\\"alice\\",\\"role\\":\\"USER\\",\\"exp\\":2000}");
        System.out.println(verify(good, 1000));

        String[] parts = good.split("\\\\.");
        String forgedPayload = B64.encodeToString("{\\"sub\\":\\"alice\\",\\"role\\":\\"ADMIN\\",\\"exp\\":2000}".getBytes());
        System.out.println(verify(parts[0] + "." + forgedPayload + "." + parts[2], 1000));

        String none = B64.encodeToString("{\\"alg\\":\\"none\\"}".getBytes()) + "." + parts[1] + ".";
        System.out.println(verify(none, 1000));

        System.out.println(verify(good, 3000));
    }
}`, `accepted: {"sub":"alice","role":"USER","exp":2000}
rejected: bad signature
rejected: unexpected algorithm
rejected: expired`, 'Signature, algorithm and expiry checks'),
    h2('How does it work?'),
    ul(['The signature is an HMAC of <code>header.payload</code>. Changing <code>USER</code> to <code>ADMIN</code> changes the data, so the old signature no longer matches.',
      'The verifier accepts only the algorithm it expects. A token claiming <code>alg: none</code> is rejected instead of being treated as “no signature needed”.',
      '<code>MessageDigest.isEqual</code> compares in constant time, so timing does not reveal how much of the signature matched.',
      'The expiry check uses the server’s clock; the example passes the time in to keep the output fixed.']),
    h2('In Spring Boot: use the resource server'),
    K.show(`# application.properties: Spring downloads the issuer's public keys and validates iss and exp
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://login.example.com/realms/shop
spring.security.oauth2.resourceserver.jwt.audiences=orders-api`, 'Configuration'),
    K.show(`@Bean
SecurityFilterChain api(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
        .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()))
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable())   // safe only because the token is sent in the Authorization header
        .build();
}`, 'Stateless API security', 'java'),
    h2('Important points'),
    ul(['Validate signature, algorithm, <code>exp</code>, <code>iss</code> and <code>aud</code>. Do not write your own JWT parser.',
      'Never put secrets or sensitive personal data in the payload; it is readable by anyone.',
      'Keep access tokens short-lived (minutes). A JWT cannot easily be revoked before it expires. Use refresh tokens that are stored, rotated and revocable.',
      'Prefer asymmetric keys (RS256/ES256) when several services verify tokens, so verifiers do not hold the signing key.',
      'Storage: <code>localStorage</code> is readable by any XSS. An HttpOnly cookie is not readable by script, but is sent automatically, so you need CSRF protection.']),
    K.interview([
      ['How do you log out a user with JWTs?', 'Short access-token lifetime plus server-side revocation of the refresh token. For immediate revocation, keep a deny-list of token IDs (<code>jti</code>) until they expire, or use opaque tokens with introspection.'],
      ['What is the “alg: none” attack?', 'A forged token declares no algorithm and has no signature. A library that trusts the header skips verification. Always configure the accepted algorithm on the server.'],
      ['What is algorithm confusion?', 'A token signed with HS256 using an RSA public key as the HMAC secret is accepted by a verifier that lets the token choose the algorithm. Fix the expected algorithm and key type.'],
      ['Session cookie or JWT?', 'Sessions are simple to revoke and fit server-rendered apps. JWTs suit stateless APIs and multiple services. Many browser apps use a session (or a backend-for-frontend) and keep tokens off the browser.'],
      ['Why validate the audience claim?', 'So a token issued for another service, by the same identity provider, cannot be used against your API.'],
    ]),
  ]);

  // ---------------------------------------------------------------- IDOR
  L('idor', 'Broken access control and IDOR', () => [
    h2('What is IDOR?'),
    p('An Insecure Direct Object Reference (IDOR) happens when an endpoint takes an ID from the request and returns or changes that record without checking that it belongs to the caller. User 1 changes <code>/orders/101</code> to <code>/orders/102</code> and sees someone else’s order.'),
    p('In API security this is called BOLA: Broken Object Level Authorization. It is one form of broken access control, the most common serious web vulnerability.'),
    h2('Why does it happen?'),
    p('The endpoint checks that the user is logged in, but not that this user may access this object. Authentication is present; authorization is missing.'),
    h2('Example'),
    K.java(`import java.util.*;

record Order(long id, String owner, String item) {}

class OrderService {
    private final Map<Long, Order> orders = Map.of(
        101L, new Order(101, "alice", "Laptop"),
        102L, new Order(102, "bob", "Phone"));

    // Vulnerable: any logged-in user can read any order.
    Optional<Order> findVulnerable(long id) {
        return Optional.ofNullable(orders.get(id));
    }

    // Fixed: the order must belong to the current user.
    Optional<Order> findForUser(long id, String currentUser) {
        return Optional.ofNullable(orders.get(id))
                       .filter(order -> order.owner().equals(currentUser));
    }
}

public class Main {
    public static void main(String[] args) {
        OrderService service = new OrderService();
        String currentUser = "alice";

        System.out.println("Vulnerable: " + service.findVulnerable(102).map(Order::item).orElse("404 Not Found"));
        System.out.println("Fixed, own order: " + service.findForUser(101, currentUser).map(Order::item).orElse("404 Not Found"));
        System.out.println("Fixed, bob's order: " + service.findForUser(102, currentUser).map(Order::item).orElse("404 Not Found"));
    }
}`, `Vulnerable: Phone
Fixed, own order: Laptop
Fixed, bob's order: 404 Not Found`, 'Checking ownership'),
    h2('How does it work?'),
    ul(['<code>currentUser</code> comes from the authenticated principal, never from a request parameter.',
      'The fixed method returns nothing when the owner does not match, so the controller returns 404.',
      'Returning 404 instead of 403 also hides whether order 102 exists.']),
    h2('In a Spring application'),
    p('The simplest strong fix is to put the owner into the query, so the database never returns another user’s row.'),
    K.show(`interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByIdAndOwnerUsername(Long id, String username);
}

@GetMapping("/orders/{id}")
OrderDto get(@PathVariable Long id, Authentication auth) {
    return orders.findByIdAndOwnerUsername(id, auth.getName())
                 .map(OrderDto::from)
                 .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
}`, 'Scope the query to the current user', 'java'),
    h2('Related access-control mistakes'),
    ul(['<strong>Function-level</strong> (BFLA): an admin endpoint such as <code>DELETE /users/{id}</code> is protected only by hiding the button in the UI.',
      '<strong>Mass assignment</strong>: binding a request body straight to an entity lets a user set fields like <code>role</code> or <code>ownerId</code>. Use request DTOs that contain only editable fields.',
      '<strong>Multi-tenant leaks</strong>: queries that forget the <code>tenant_id</code> filter. Apply the tenant from the authenticated context in one central place.']),
    h2('Important points'),
    ul(['Random IDs (UUIDs) make guessing harder, but they are not access control.',
      'Check authorization on the server for every object, every method (GET, PUT, DELETE), and every export or bulk endpoint.',
      'Keep the check in the service or repository layer so every entry point uses it.']),
    h2('How to test it'),
    p('For each endpoint with an ID, write a test with two users: user A creates a record, user B requests, updates and deletes it. Every call by B must return 404 (or 403) and change nothing.'),
    K.interview([
      ['What is IDOR / BOLA?', 'An endpoint accepts an object ID and does not verify that the caller may access that object. Changing the ID exposes or modifies another user’s data.'],
      ['Do UUIDs fix IDOR?', 'No. They make IDs harder to guess, but IDs leak through URLs, logs and shared links. The server must still check ownership.'],
      ['404 or 403 for someone else’s record?', '404 is usually better for user-owned records because it does not reveal that the record exists. 403 suits cases where the resource is known to exist, such as admin functions.'],
      ['How do you prevent mass assignment?', 'Bind requests to dedicated DTOs with only the allowed fields, map them explicitly to entities, and never bind directly to JPA entities.'],
      ['How do you enforce tenant isolation?', 'Take the tenant from the authenticated context, apply it in every query (repository methods, Hibernate filters or database row-level security), and test cross-tenant access.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Path traversal
  L('path_traversal', 'Path traversal in file handling', () => [
    h2('What is path traversal?'),
    p('Path traversal happens when a file name from the request contains <code>../</code> and the application uses it to build a file path. The attacker can then read or overwrite files outside the intended folder, such as configuration files with passwords.'),
    h2('Why does it happen?'),
    p('<code>Path.resolve()</code> simply joins paths. <code>uploads/../../config</code> is a valid path that points outside <code>uploads</code>.'),
    h2('Example'),
    K.java(`import java.nio.file.Path;

public class Main {
    static final Path UPLOADS = Path.of("uploads").toAbsolutePath().normalize();

    static Path safeResolve(String fileName) {
        Path target = UPLOADS.resolve(fileName).normalize();
        if (!target.startsWith(UPLOADS)) {
            throw new SecurityException("Blocked: " + fileName);
        }
        return target;
    }

    public static void main(String[] args) {
        String requested = "../../secret/config.properties";

        Path vulnerable = UPLOADS.resolve(requested).normalize();
        System.out.println("Vulnerable path stays in uploads: " + vulnerable.startsWith(UPLOADS));

        try {
            safeResolve(requested);
        } catch (SecurityException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Allowed: " + safeResolve("invoice-42.pdf").getFileName());
    }
}`, `Vulnerable path stays in uploads: false
Blocked: ../../secret/config.properties
Allowed: invoice-42.pdf`, 'Normalize and check the base folder'),
    h2('How does it work?'),
    ul(['<code>normalize()</code> removes <code>.</code> and <code>..</code> segments, so the real target is visible.',
      '<code>startsWith(UPLOADS)</code> compares whole path elements, not text, so <code>uploads-old</code> does not match <code>uploads</code>.',
      'Any path that leaves the folder is rejected before a file is opened.']),
    h2('A better design: do not use user file names'),
    ul(['Store uploads under a server-generated name (for example a UUID) and keep the original name in the database.',
      'Download by record ID, check that the user owns the record (see IDOR), then open the stored path.',
      'Store uploads outside the web root, limit file size, check the real content type, and send <code>Content-Disposition: attachment</code> for downloads.',
      'When extracting ZIP files, apply the same check to every entry name (“zip slip”).']),
    K.interview([
      ['How do you prevent path traversal in a download endpoint?', 'Avoid user-supplied paths: look up the file by ID after an ownership check. If a name must be used, resolve it against a base folder, normalize it, and verify it still starts with the base folder.'],
      ['Is rejecting the text "../" enough?', 'No. Attackers use encodings (<code>%2e%2e%2f</code>), backslashes on Windows, absolute paths and symbolic links. Normalize the final path and check it.'],
      ['What is zip slip?', 'An archive entry named like <code>../../app/config.yml</code> is written outside the extraction folder. Validate every entry’s resolved path before writing.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Sensitive data
  L('sensitive_data', 'Sensitive data in logs and errors', () => [
    h2('What is sensitive data exposure?'),
    p('Sensitive data exposure happens when passwords, tokens, personal data or internal details reach a place they should not: log files, error responses, API responses or source code.'),
    h2('Why does it happen?'),
    p('Usually by accident: logging a whole request object, a record’s default <code>toString()</code>, returning a stack trace to the client, or returning a JPA entity that has more fields than the client needs.'),
    h2('Example'),
    K.java(`record LoginRequest(String username, String password) {}

record SafeLoginRequest(String username, String password) {
    @Override
    public String toString() {
        return "SafeLoginRequest[username=" + username + ", password=****]";
    }
}

public class Main {
    static String maskCard(String number) {
        return "**** **** **** " + number.substring(number.length() - 4);
    }

    public static void main(String[] args) {
        System.out.println("Logged: " + new LoginRequest("alice", "hunter2"));
        System.out.println("Logged: " + new SafeLoginRequest("alice", "hunter2"));
        System.out.println("Card: " + maskCard("4111111111111111"));
    }
}`, `Logged: LoginRequest[username=alice, password=hunter2]
Logged: SafeLoginRequest[username=alice, password=****]
Card: **** **** **** 1111`, 'A record’s toString() can leak a password'),
    h2('How does it work?'),
    ul(['A record’s generated <code>toString()</code> includes every component, so logging the object logs the password.',
      'Overriding <code>toString()</code> masks the secret everywhere the object is printed.',
      'Masking keeps only the part needed for support, such as the last four card digits.']),
    h2('Safe error responses'),
    p('Return a short, generic message and a correlation ID to the client. Write the details and the stack trace to the server log with the same ID.'),
    K.show(`{
  "type": "about:blank",
  "title": "Internal Server Error",
  "status": 500,
  "detail": "Something went wrong. Quote reference 7f3a9c when contacting support.",
  "instance": "/api/orders/42"
}`, 'Client sees (ProblemDetail JSON)'),
    K.show(`server.error.include-stacktrace=never
server.error.include-message=never
management.endpoints.web.exposure.include=health,info`, 'Spring Boot settings'),
    h2('Important points'),
    ul(['Never log passwords, tokens, session IDs, full card numbers or secrets. Be careful with personal data.',
      'Use response DTOs. Do not return JPA entities: you can leak fields such as <code>passwordHash</code>, and lazy relations can cause extra queries.',
      'Keep secrets out of source code and Git. Load them from environment variables or a secrets manager, and rotate any secret that was committed.',
      'Expose only the Actuator endpoints you need. <code>/actuator/env</code> and <code>/actuator/heapdump</code> can reveal secrets.']),
    K.interview([
      ['How do you stop secrets appearing in logs?', 'Do not log whole request objects; mask fields in <code>toString()</code> or with logging filters; use DTOs without secret fields; and scan logs and code in CI.'],
      ['Why should an API not return stack traces?', 'They reveal class names, library versions, SQL and file paths that help an attacker. Return a generic message with a correlation ID instead.'],
      ['What would you do if a secret was committed to Git?', 'Rotate the secret immediately (treat it as leaked), remove it from the code, move it to a secrets store, and only then consider cleaning history.'],
      ['Why use DTOs instead of returning entities?', 'DTOs control exactly which fields leave the server, prevent mass assignment on input, and decouple the API from the database schema.'],
    ]),
  ]);
})();
