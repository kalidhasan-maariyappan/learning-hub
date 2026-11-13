# Spring Boot course practice

Open the lesson's `pom.xml` in IntelliJ IDEA, or use a terminal in its directory:

```powershell
mvn -B package
java -jar target/lesson-15-1.0.0.jar
```

Replace 15 with the selected lesson number. Use Java 25 and Maven. Ordinary web examples listen on port 8080; stop one application before starting another. Lesson 8 is a console lifecycle example and closes its context itself. The Maven files pin compatible local versions; lesson 63 uses Boot 4.1.1 and the others use 3.5.16.

These folders are separate teaching states of the source examples. You can open a state independently or copy changes into one working project. If continuing a project, keep its base package and update imports consistently. Numbered packages separate the supplied states. Full file walkthroughs and request sequences are on the corresponding website lesson. Lessons 49/53/57/59 reuse 48/52/56/41 to inspect the same implementation.

Lesson 3 has `alternatives/strings/` for its first, plain-string phase. Copy the three Java files over their matching files in `src/main/java`, rebuild, and request `/api/getEmployee/1`. Restore the entity/DTO versions shown on the page for the second phase. Lifecycle-interface, singleton and Lombok logging alternatives are shown in full on their pages.

Lesson 51 needs the companion `config-server` and its Git configuration repository. Follow the page's two-terminal setup. Lesson 33 needs local Redis. Lesson 47 needs your Google OAuth client registration and environment credentials. Lesson 60 needs Docker with Compose and MySQL; run `mvn package` before `docker compose up --build`.

The local batch input is a small disclosed CSV fixture. Credentials/contact values are synthetic practice data. Email, SMS and payment examples print or return demonstration messages. They do not contact delivery/payment providers.

From the repository root, build all modules with `mvn -B -f demo/spring-boot-crash/labs/pom.xml package`. Verification scripts are in `scripts/verify-spring-boot-crash-*.cjs`; set `JAVA_RUNNER_HOME` to the actual installed JDK directory before runtime checks. Results and source hashes are in `docs/SPRING-BOOT-CRASH-LABS-*.json`. Generating lab states again replaces their generated files, so keep student edits in a separate working copy.
