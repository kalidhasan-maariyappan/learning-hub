# Lesson 48: Spring events

This is a reconstruction of the example **described aloud** in transcript 48, not a recovered copy of the instructor's source repository.

The transcript describes an `OrderCreatedEvent` POJO with a constructor and getter, an `OrderService` that publishes it with `ApplicationEventPublisher`, a POST controller, and component listeners that print email and logging messages. No real email is sent. Auditing is discussed as a possible subscriber, but no auditing listener is implemented in the video or here.

Implementation follows the described sequence: event → service → controller → publisher → email listener → logging listener. The main application, Java imports, package name, String ID type, exact message capitalization, controller injection style, and void response fill the minimum project scaffolding needed to run that description. These details are not quoted source code. The captions do not give an exact response body or complete class listings.

## Java 25 and version gap

Use the installed Java 25 and Maven. The instructor selects Java 17; this project targets Java 25 without adding Java 25 language features. The caption says “this Spring Boot version” without naming it. Consequently the POM requires an explicit `boot.version`; no instructor version is inferred.

For local verification we use the already cached **3.5.16** version. This is a disclosed test baseline, not a claim about the instructor's version or a prescribed upgrade of the course.

```powershell
mvn -B '-Dboot.version=3.5.16' package
java -jar target/spring-events-demo-1.0.0.jar
```

In another terminal, reproduce the described Postman request:

```powershell
Invoke-WebRequest -Method Post http://localhost:8080/order/1
```

The service prints the order ID; both listeners print that same ID. The email and log listener ordering is not asserted. No output is presented as an exact recording of the video.

From the repository root, after packaging, verify real HTTP requests and listener output:

```powershell
node scripts/verify-spring-boot-crash-events.cjs
```

The verifier launches the JAR on an ephemeral loopback port, submits two POST requests, checks both listener messages for each order, and stops its child process. It uses Java 25. It does not modify the system JDK.
