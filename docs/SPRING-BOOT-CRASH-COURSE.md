# Spring Boot Crash Course: instructor revision

The 63 supplied Markdown transcripts in `bootcamp-springboot/` remain the course source, in their original sequence. Lesson 1 keeps its reviewed compact introduction and roadmap. Lessons 2–63 now teach the material directly: introduce the concept, explain why it is needed, create the files, trace the example, and run or inspect the result. The pages do not narrate what an instructor said or display transcript paragraphs as lessons.

## Teaching and presentation

Each lesson has a conversational opening and a concept map or execution flow. Practical lessons include the project structure, complete source files with imports, explanations of important statements, commands, requests and expected observations. Larger supporting files are expandable. Debugger walkthroughs cover the relevant proxy, transaction, persistence and security boundaries. There is no “On this page” link block; spacing is compact and responsive.

The source examples remain recognizable: Employee layers and DTOs, User/Order injection, payment selection, Product operations, Book CRUD and transactions, Applicant relationships, Weather caching/security, and order events. Earlier/later implementations are distinguished. Lesson 3 includes the initial string-returning layers before the entity/DTO version; lifecycle, singleton and Lombok logging alternatives are also complete files.

## Runnable project states

`demo/spring-boot-crash/labs/` contains 55 Maven modules: 54 numbered lesson states and a config-server companion. There are 58 lesson pages with practical project references; lessons 49, 53, 57 and 59 deliberately reuse the state being inspected. Lessons 1, 24, 26, 39 and 46 teach overview/theory without inventing another application.

All 55 modules were packaged with the installed Java 25.0.4.1. Six JUnit tests passed. Local states select Boot 3.5.16, except lesson 63 which selects Boot 4.1.1 for its starter comparison. These are explicit compatibility choices, not assertions about unspecified original dependency versions.

Runtime evidence covers 52 module states and 158 HTTP requests, including the Git-backed config-server/client pair, and four separately compiled/executed alternatives. The JSON result files record the exact file hashes and individual checks. The checks exercise real HTTP requests, rollback, JPA associations, security decisions, caching, asynchronous events, scheduling, retry/recovery, configuration refresh and deferred bean identity. They establish the listed observations; they do not prove every possible concurrency anomaly, failure variation or deployment environment.

Redis (33), Google OAuth credentials/provider login (47), and Docker/MySQL (60) require services or credentials unavailable locally. Their Java projects compiled, their setup and manual verification steps are included, and their external runtime behavior is not labeled locally verified. Notification examples print messages rather than sending real email or SMS. The batch CSV is a disclosed small local fixture because the original large input is unavailable.

Complete source listings necessarily supply missing imports, accessors, package names and minimum setup where captions refer to on-screen code. These reconstruction choices are disclosed separately from the teaching. Source titles, filenames and provenance are retained in a collapsed disclosure. Raw transcripts remain internal data and are not loaded as lesson content.

## Build and verify

```powershell
node scripts/build-spring-boot-crash-labs.cjs
mvn -B -f demo/spring-boot-crash/labs/pom.xml package
node scripts/record-spring-boot-crash-build.cjs
# Set JAVA_RUNNER_HOME to the actual JDK directory for runtime verification.
node scripts/verify-spring-boot-crash-labs.cjs
node scripts/verify-spring-boot-crash-config.cjs
node scripts/verify-spring-boot-crash-variants.cjs
node scripts/build-spring-boot-crash-course.js
node scripts/verify-spring-boot-crash-course.cjs
node scripts/build-pages.js
# Browser checks require Playwright via PLAYWRIGHT_MODULE or Node resolution.
node scripts/verify-spring-boot-crash-browser.cjs
node scripts/verify-pwa.cjs
node scripts/verify-pwa-course-upgrade.cjs
node scripts/verify-rails-practical.js
node scripts/verify-interview-prep.js
```

The course check validates all 63 source hashes, ordering, titles, authored structures, practical references and routes. The browser sweep visits all lessons and checks every page at 768px and 390px, plus navigation, copy, search and existing-course smoke tests. PWA checks cover static `/learning-hub/` paths, offline navigation and migration from the old cached router. The static export contains 5,794 application routes.

Evidence: `SPRING-BOOT-CRASH-MAPPING.json`, `SPRING-BOOT-CRASH-LABS-BUILD.json`, `SPRING-BOOT-CRASH-LABS-RESULTS.json`, and `SPRING-BOOT-CRASH-VARIANTS-RESULTS.json`. The earlier lesson-48-only report is historical; the lab results supersede that limited execution scope.

The previous cached-router “ng-boot-crash-course” failure is handled by versioned router assets and the updated network-first script/style worker. An existing installation can reload online and activate **Update app** to refresh its offline copy.
