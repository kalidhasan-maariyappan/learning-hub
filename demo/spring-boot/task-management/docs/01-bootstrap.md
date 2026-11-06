> Historical Step 1 checkpoint. The full H2 application is now implemented. See README.md and docs/02-implementation.md for the current setup.

# Phase 1, Step 1: bootstrap

This checkpoint creates a runnable REST application foundation. It intentionally
ends before database configuration so the supplied plan can be followed one step
at a time. Paths below are relative to `D:\learning-hub\task-management`.

## How the files connect

1. `pom.xml` selects Java 25 and the Boot parent, manages dependency versions,
   and configures packaging. Web MVC supplies embedded Tomcat and REST support;
   validation supplies Jakarta Bean Validation for later DTOs; Actuator supplies
   the health endpoint. The Boot Maven plugin creates an executable JAR.
2. `src/main/java/com/example/taskmanagement/TaskManagementApplication.java`
   is the entry point. `@SpringBootApplication` enables Boot configuration,
   auto-configuration, and component scanning under `com.example.taskmanagement`.
   Future controllers, services, and repositories will live below that package.
   `SpringApplication.run` starts the application context and embedded web server.
3. `src/main/resources/application.yml` is loaded automatically at startup.
   It names the application and exposes only health, hiding health details.
4. `src/test/java/com/example/taskmanagement/TaskManagementApplicationTests.java`
   starts the application context through `@SpringBootTest`. The smoke test detects
   incompatible configuration or missing startup dependencies; it does not yet
   verify business behavior.
5. `mvnw`, `mvnw.cmd`, and `.mvn/wrapper/maven-wrapper.properties` are generated
   Maven wrapper infrastructure. On Windows, use `mvnw.cmd` to download and invoke
   the pinned Maven distribution. No global Maven installation is required.
6. `.gitignore` excludes build output, editor files, and local credential files.
   `README.md` records how to run and the current implementation boundary.

## Complete application source

### D:\learning-hub\task-management\pom.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>4.1.2</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>task-management</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>task-management</name>
	<description>Task Management REST API</description>
	<url/>
	<licenses>
		<license/>
	</licenses>
	<developers>
		<developer/>
	</developers>
	<scm>
		<connection/>
		<developerConnection/>
		<tag/>
		<url/>
	</scm>
	<properties>
		<java.version>25</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webmvc</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webmvc-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

### D:\learning-hub\task-management\src/main/java/com/example/taskmanagement/TaskManagementApplication.java

```
package com.example.taskmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagementApplication.class, args);
	}

}
```

### D:\learning-hub\task-management\src/main/resources/application.yml

```
spring:
  application:
    name: task-management

management:
  endpoints:
    web:
      exposure:
        include: health
  endpoint:
    health:
      show-details: never
```

### D:\learning-hub\task-management\src/test/java/com/example/taskmanagement/TaskManagementApplicationTests.java

```
package com.example.taskmanagement;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TaskManagementApplicationTests {

	@Test
	void contextLoads() {
	}

}
```

### D:\learning-hub\task-management\.mvn/wrapper/maven-wrapper.properties

```
wrapperVersion=3.3.4
distributionType=only-script
distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.10.0/apache-maven-3.10.0-bin.zip
```

### D:\learning-hub\task-management\.gitignore

```
HELP.md
target/
.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/

# Local credentials
.env
.env.*
!.env.example
application-local.yml
```

## Verify this step

From `D:\learning-hub\task-management`, run `./mvnw.cmd verify`. Expect one
passing context test and BUILD SUCCESS. This compiles the source, runs tests,
and packages the executable JAR.

Run `java -jar target/task-management-0.0.1-SNAPSHOT.jar`, then request
`http://localhost:8080/actuator/health`. Expect HTTP 200 and a JSON body containing `"status":"UP"`.
Stop the server with Ctrl+C. The health endpoint comes from Actuator, so no
custom controller is required for this check.

JPA, transactions, Hibernate/JDBC, and entity relationships will be explained
when their actual files are introduced in Phase 1, Steps 2–4.

Verified locally: Maven verify passed (1 test, zero failures); executable JAR started on port 18080 and GET /actuator/health returned HTTP 200 with status UP. The verification server was stopped afterward.

