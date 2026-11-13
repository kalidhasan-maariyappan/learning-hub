const {lab,java,main,pojo,props,packageName:p}=require('./common.cjs');
const out=[],basic=user=>'Basic '+Buffer.from(user+':password').toString('base64');
const jwtDeps=['io.jsonwebtoken:jjwt-api:0.12.6','io.jsonwebtoken:jjwt-impl:0.12.6','io.jsonwebtoken:jjwt-jackson:0.12.6'];
const secret=Buffer.from('learning-hub-local-demo-key-not-for-production-0001').toString('base64');
{
const n=37;out.push(lab(n,'Default security boundary',['web','security'],[main(n),java(n,'WeatherController.java',`import org.springframework.web.bind.annotation.*;
@RestController
public class WeatherController { @GetMapping("/weather/health") public String health() { return "Weather service running"; } }`),props('spring.security.user.name=user\nspring.security.user.password=password')],[{path:'/weather/health',status:401},{path:'/weather/health',headers:{Authorization:basic('user')},status:200,contains:'Weather service running'}],{choices:'The fixed non-secret test username/password makes the default filter behavior reproducible instead of depending on the generated random password. The architecture lesson still explains that default generation and the login flow.'}));}
for(const n of [38,40,41,42,43,44,45]){
 const hasJwt=n>=40;
 const user=pojo(n,'entity/AppUser.java',{id:'Long',username:'String',password:'String',role:n>=43?'Role':'String'},'@Entity','import jakarta.persistence.*;\nimport org.springframework.security.core.userdetails.UserDetails;\nimport org.springframework.security.core.GrantedAuthority;\nimport org.springframework.security.core.authority.SimpleGrantedAuthority;\nimport java.util.*;');user.text=user.text.replace('class AppUser {','class AppUser implements UserDetails {').replace('private Long id;','@Id @GeneratedValue\n    private Long id;').replace('private String username;','@Column(unique=true,nullable=false)\n    private String username;');
 if(n>=43)user.text=user.text.replace('private Role role;','@Enumerated(EnumType.STRING)\n    private Role role;');
 user.text=user.text.replace(/\n}\n$/,`\n    @Override public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities=new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + ${n>=43?'role.name()':'role'}));
${n>=43?'        for(Permission permission:role.getPermissions())authorities.add(new SimpleGrantedAuthority(permission.name()));':''}
        return authorities;
    }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}\n`);
 const files=[main(n,n>=44?'@org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity':''),user,java(n,'repository/UserRepository.java',`import ${p(n)}.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserRepository extends JpaRepository<AppUser,Long> { Optional<AppUser> findByUsername(String username); }`),java(n,'security/DatabaseUserDetailsService.java',`import ${p(n)}.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
@Service
public class DatabaseUserDetailsService implements UserDetailsService {
    private final UserRepository repository;
    public DatabaseUserDetailsService(UserRepository repository) { this.repository=repository; }
    public UserDetails loadUserByUsername(String username) {
        return repository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
    }
}`),java(n,'security/SecurityConfig.java',`import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.http.HttpMethod;
${n>=41?'import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;':''}
@Configuration
public class SecurityConfig {
    @Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean public AuthenticationManager authenticationManager(UserDetailsService users,PasswordEncoder encoder) {
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
        provider.setUserDetailsService(users); provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);
    }
    @Bean public SecurityFilterChain security(HttpSecurity http${n>=41?',JwtRequestFilter jwt':''}) throws Exception {
        http.csrf(csrf->csrf.disable()).headers(headers->headers.frameOptions(frame->frame.sameOrigin()));
        http.authorizeHttpRequests(auth->auth.requestMatchers("/api/auth/login","/api/auth/register","/h2-console/**").permitAll()
${n===42?'            .requestMatchers("/weather/health").hasRole("ADMIN")':n===43?'            .requestMatchers(HttpMethod.GET,"/weather/**").hasAuthority("WEATHER_READ")\n            .requestMatchers(HttpMethod.POST,"/weather/**").hasAuthority("WEATHER_WRITE")\n            .requestMatchers(HttpMethod.DELETE,"/weather/**").hasAuthority("WEATHER_DELETE")':''}
            .anyRequest().authenticated());
        http.httpBasic(Customizer.withDefaults());
${n>=41?'        http.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));\n        http.addFilterBefore(jwt,UsernamePasswordAuthenticationFilter.class);':''}
        return http.build();
    }
}`),java(n,'config/DemoUsers.java',`import ${p(n)}.entity.AppUser;
import ${p(n)}.repository.UserRepository;
${n>=43?'import '+p(n)+'.entity.Role;':''}
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
@Component
public class DemoUsers implements CommandLineRunner {
    private final UserRepository repository; private final PasswordEncoder encoder;
    public DemoUsers(UserRepository repository,PasswordEncoder encoder) { this.repository=repository;this.encoder=encoder; }
    public void run(String... args) {
        repository.save(new AppUser(null,"admin",encoder.encode("password"),${n>=43?'Role.ADMIN':'"ADMIN"'}));
        repository.save(new AppUser(null,"user",encoder.encode("password"),${n>=43?'Role.USER':'"USER"'}));
    }
}`),java(n,'service/WeatherService.java',`import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
@Service
public class WeatherService {
    private final Map<String,String> weather=new ConcurrentHashMap<>();
    public Map<String,String> get(String city) { return Map.of("city",city,"forecast",weather.getOrDefault(city,"Sunny")); }
    public Map<String,String> update(String city,String forecast) { weather.put(city,forecast);return get(city); }
    public void delete(String city) { weather.remove(city); }
}`),java(n,'controller/WeatherController.java',`import org.springframework.web.bind.annotation.*;
import ${p(n)}.service.WeatherService;
${n>=44?'import org.springframework.security.access.prepost.PreAuthorize;':''}
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
@RestController
@RequestMapping("/weather")
public class WeatherController {
    private final WeatherService service;
    public WeatherController(WeatherService service) { this.service=service; }
    @GetMapping("/health") public String health() { return "Weather service running"; }
    ${n>=44?'@PreAuthorize("hasAuthority(\'WEATHER_READ\')")':''}
    @GetMapping("/{city}") public Map<String,String> get(@PathVariable("city") String city) { return service.get(city); }
    ${n>=44?'@PreAuthorize("hasAuthority(\'WEATHER_WRITE\')")':''}
    @PostMapping("/{city}") public Map<String,String> update(@PathVariable("city") String city,@RequestParam("forecast") String forecast) { return service.update(city,forecast); }
    ${n>=44?'@PreAuthorize("hasAuthority(\'WEATHER_DELETE\')")':''}
    @DeleteMapping("/{city}") public void delete(@PathVariable("city") String city) { service.delete(city); }
}`),props('spring.datasource.url=jdbc:h2:mem:security\nspring.jpa.hibernate.ddl-auto=create-drop\nspring.h2.console.enabled=true\n'+(hasJwt?'jwt.secret='+secret:''))];
 if(n>=43)files.push(java(n,'entity/Permission.java','public enum Permission { WEATHER_READ, WEATHER_WRITE, WEATHER_DELETE }'),java(n,'entity/Role.java',`import java.util.Set;
public enum Role {
    ADMIN(Set.of(Permission.WEATHER_READ,Permission.WEATHER_WRITE,Permission.WEATHER_DELETE)),
    USER(Set.of(Permission.WEATHER_READ));
    private final Set<Permission> permissions;
    Role(Set<Permission> permissions) { this.permissions=permissions; }
    public Set<Permission> getPermissions() { return permissions; }
}`));
 if(hasJwt)files.push(java(n,'security/JwtService.java',`import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;
@Component
public class JwtService {
    private final SecretKey key;
    public JwtService(@Value("${'${'}jwt.secret}") String secret) { key=Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)); }
    public String generate(String username) {
        Date now=new Date();
        return Jwts.builder().subject(username).issuedAt(now).expiration(new Date(now.getTime()+60*60*1000)).signWith(key,Jwts.SIG.HS256).compact();
    }
${n>=41?'    public String username(String token) { return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject(); }':''}
}`),pojo(n,'dto/LoginRequest.java',{username:'String',password:'String'}),java(n,'controller/LoginController.java',`import ${p(n)}.dto.LoginRequest;
import ${p(n)}.security.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
@RequestMapping("/api/auth")
public class LoginController {
    private final AuthenticationManager manager; private final JwtService jwt;
    public LoginController(AuthenticationManager manager,JwtService jwt) { this.manager=manager;this.jwt=jwt; }
    @PostMapping("/login") public Map<String,String> login(@RequestBody LoginRequest request) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
        return Map.of("token",jwt.generate(request.getUsername()));
    }
}`));
 if(n>=41)files.push(java(n,'security/JwtRequestFilter.java',`import org.springframework.stereotype.Component;
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
}`));
 if(n===44)files.push(pojo(n,'dto/LogRecord.java',{id:'Integer',performedBy:'String'}),java(n,'service/LogService.java',`import ${p(n)}.dto.LogRecord;
import org.springframework.stereotype.Service;
import org.springframework.security.access.prepost.*;
import java.util.*;
@Service
public class LogService {
    @PostAuthorize("returnObject.performedBy == authentication.name")
    public LogRecord get(Integer id) { return new LogRecord(id,id==1?"admin":"user"); }
    @PostFilter("filterObject.performedBy == authentication.name")
    public List<LogRecord> all() { return new ArrayList<>(List.of(new LogRecord(1,"admin"),new LogRecord(2,"user"))); }
}`),java(n,'controller/LogController.java',`import ${p(n)}.dto.LogRecord;
import ${p(n)}.service.LogService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class LogController {
    private final LogService service;
    public LogController(LogService service) { this.service=service; }
    @GetMapping("/logs/{id}") public LogRecord get(@PathVariable("id") Integer id) { return service.get(id); }
    @GetMapping("/logs") public List<LogRecord> all() { return service.all(); }
}`));
 if(n===45)files.push(pojo(n,'dto/RegisterUserRequest.java',{username:'String',password:'String',role:p(n)+'.entity.Role'}),pojo(n,'dto/UserResponse.java',{id:'Long',username:'String',role:p(n)+'.entity.Role'}),java(n,'service/UserService.java',`import ${p(n)}.dto.*;
import ${p(n)}.entity.AppUser;
import ${p(n)}.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
public class UserService {
    private final UserRepository repository; private final PasswordEncoder encoder;
    public UserService(UserRepository repository,PasswordEncoder encoder) { this.repository=repository;this.encoder=encoder; }
    public UserResponse registerUser(RegisterUserRequest request) {
        AppUser user=repository.save(new AppUser(null,request.getUsername(),encoder.encode(request.getPassword()),request.getRole()));
        return new UserResponse(user.getId(),user.getUsername(),user.getRole());
    }
}`),java(n,'controller/UserController.java',`import ${p(n)}.dto.*;
import ${p(n)}.service.UserService;
import ${p(n)}.entity.Role;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service=service; }
    @PostMapping("/register") public UserResponse register(@RequestBody RegisterUserRequest request) { request.setRole(Role.USER);return service.registerUser(request); }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin-create") public UserResponse create(@RequestBody RegisterUserRequest request) { return service.registerUser(request); }
}`));
 const cases=[{path:'/weather/Delhi',status:401},{path:'/weather/Delhi',headers:{Authorization:basic('user')},status:200,json:{city:'Delhi'}}];
 if(hasJwt)cases.push({path:'/api/auth/login',method:'POST',body:{username:'admin',password:'password'},status:200,saveToken:true});
 if(n>=41)cases.push({path:'/weather/Delhi',status:200,useToken:true,json:{city:'Delhi'}},{path:'/weather/Delhi',headers:{Authorization:'Bearer invalid'},status:401});
 if(n===42)cases.push({path:'/weather/health',headers:{Authorization:basic('user')},status:403},{path:'/weather/health',headers:{Authorization:basic('admin')},status:200});
 if(n>=43)cases.push({path:'/weather/Delhi?forecast=Rain',method:'POST',headers:{Authorization:basic('user')},status:403},{path:'/weather/Delhi?forecast=Rain',method:'POST',headers:{Authorization:basic('admin')},status:200,json:{forecast:'Rain'}});
 if(n===44)cases.push({path:'/logs/1',headers:{Authorization:basic('user')},status:403},{path:'/logs/2',headers:{Authorization:basic('user')},status:200,json:{performedBy:'user'}},{path:'/logs',headers:{Authorization:basic('user')},status:200,contains:'user'});
 if(n===45)cases.push({path:'/api/auth/register',method:'POST',body:{username:'newuser',password:'password',role:'ADMIN'},status:200,json:{role:'USER'},absent:['password']},{path:'/weather/Delhi',headers:{Authorization:basic('newuser')},status:200},{path:'/weather/Delhi?forecast=Snow',method:'POST',headers:{Authorization:basic('newuser')},status:403},{path:'/api/auth/admin-create',method:'POST',headers:{Authorization:basic('user')},body:{username:'blocked',password:'password',role:'ADMIN'},status:403},{path:'/api/auth/admin-create',method:'POST',headers:{Authorization:basic('admin')},body:{username:'newadmin',password:'password',role:'ADMIN'},status:200,json:{role:'ADMIN'}},{path:'/weather/Delhi?forecast=Snow',method:'POST',headers:{Authorization:basic('newadmin')},status:200,json:{forecast:'Snow'}});
 out.push(lab(n,'Weather security application',['web','jpa','h2','security',...(hasJwt?jwtDeps:[])],files,cases,{choices:'Seeded usernames, password and HMAC key are non-secret local fixtures. JJWT 0.12.6 is an explicit compatible implementation choice where the original dependency version is absent. The weather store and ownership log records are minimal local data for exercising access rules. AppUser implements UserDetails; the permission lessons add the Role and Permission enums used by its authority mapping.'}));
}
{
const n=47;out.push(lab(n,'Google OAuth2 client',['web','security','oauth'],[main(n),java(n,'SecurityConfig.java',`import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;
@Configuration
public class SecurityConfig {
    @Bean public SecurityFilterChain security(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth->auth.requestMatchers("/public").permitAll().anyRequest().authenticated()).oauth2Login(Customizer.withDefaults()).build();
    }
}`),java(n,'ProfileController.java',`import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.Map;
@RestController
public class ProfileController {
    @GetMapping("/public") public String publicPage() { return "OAuth2 client configured"; }
    @GetMapping("/profile") public Map<String,Object> profile(@AuthenticationPrincipal OAuth2User user) { return user.getAttributes(); }
}`),props('spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}\nspring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}\nspring.security.oauth2.client.registration.google.scope=openid,profile,email')],[],{external:'Create the Google client registration taught in this lesson. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the run environment and register http://localhost:8080/login/oauth2/code/google as the callback. Provider sign-in needs your own account and credentials; compilation does not verify that external login.'}));}
module.exports=out;
