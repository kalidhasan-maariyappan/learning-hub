# Lesson 1 review pilot

Visual teaching revision: Lesson 1 now includes a six-stage learning-path map (start, connect, manage, build, support, deploy), plus a controller → service → repository request-flow diagram. The map groups the existing roadmap topics without adding new lessons or treating later topics as implemented examples. It has numbered stages and a mobile vertical layout, not navigation links. The layer responsibilities also follow the clarification supplied by the user. Only Lesson 1 opts into the new map renderer.

Latest revision: direct, conversational instruction. The lesson now addresses the learner as “we” and “you”, introduces each topic through its purpose, and walks through the transcript’s channel-URL example. It keeps the compact layout, omits outline links, and uses no topic-summary tables. Lesson 2 and later content remain unchanged. Earlier decisions below are historical and superseded where they differ.

Status: revised again for user review after feedback about essay-like prose, excessive spacing, and the unwanted topic links. Lesson 1 now uses short explanations, lists, a configuration illustration and compact comparison tables. Its outline links, learning-objectives preamble and expandable roadmap sections have been removed. Do not apply this treatment to Lesson 2 or later lessons until the user reviews this pilot. The earlier teaching decisions below document the preceding revision and are superseded by this status.

Source: `bootcamp-springboot/1. Spring Boot Roadmap 2024 Step-by-Step Guide to Mastering Spring Boot.md` (all 13 paragraphs). Original title: “Spring Boot Roadmap 2024 | Step-by-Step Guide to Mastering Spring Boot”. The page keeps the short teaching title “Spring Boot Roadmap” and retains the exact video title in its source disclosure.

## Teaching decisions

- Begin with the student's immediate goal and three learning objectives.
- Explain the small book application, then connect its setup to build tools and the foundational concepts.
- Keep the channel-URL example from the transcript. Its property spelling and placeholder are explicitly identified as a reconstruction. It illustrates configuration; it is not presented as a runnable application.
- Keep advanced topics at roadmap depth. Two expandable sections preserve their coverage without placing an open wall of advanced terminology in front of a beginner.
- Finish by directing the student to project setup. No invented Java application, package implementation, API response, dependency version, breakpoint exercise or runtime output is added: none is demonstrated in this roadmap transcript.

## Source coverage checklist

| Source paragraphs | Meaningful instruction | Where represented |
| --- | --- | --- |
| 1 | Why Boot, easier configuration, starters, server, Actuator and production features | Why start with Spring Boot? |
| 2 | First project, IntelliJ, book example/four simple APIs, controller/service/repository and test organization | Your first goal |
| 2–3 | Maven/Gradle, build and dependency management, pom.xml, JUnit download/classpath | Your first goal |
| 3–4 | Named application/controller/mapping/parameter/body/component/service/repository/autowiring annotations | Foundations table |
| 4–5 | Dependency injection/IoC, field/setter/constructor, selection/advantages/disadvantages | Foundations table |
| 5–6 | One channel-URL property reused throughout application, one-place update, hierarchical YAML | URL illustration and explanation |
| 6–7 | Environment-specific configuration: test, production and other environments | Foundations and URL example |
| 7 | Beans as Java objects, creation, storage, annotations, lifecycle through destruction | Foundations table |
| 7–8 | Scope, singleton default, prototype/request/session | Foundations scope explanation |
| 8–9 | Data access, Spring Data JPA/JPA, JDBC alternative, book API and future deeper REST teaching | Later: APIs |
| 9 | Security, dependency support, authentication/authorization/users/roles | Later: APIs |
| 9–10 | Logging, controller exception handling, caching, interceptors/request/response, scheduling | Later: APIs |
| 10 | JUnit/Mockito and mocking injected collaborators | Later: APIs |
| 10–11 | Actuator dependency/endpoints, health, metrics and beans | Boot benefits and Later: APIs |
| 11 | Embedded Tomcat, Docker, CI/CD/Jenkins, AWS/Azure/Google Cloud/deploy/scale | Later: deployment |
| 11–12 | Microservices/Eureka, request across services, trace ID/Sleuth/Zipkin/failure location | Later: deployment |
| 12 | API gateway entry/routing and centrally shared configuration | Later: deployment |
| 13 | Common setting changed centrally, roadmap includes available and planned videos | Later: deployment and source-era note |

Promotional messages, requests to subscribe, and repeated video-link directions are omitted. Future-video topics remain introductions. No external sources were consulted. Compatibility: no executable code is introduced, and the installed Java 25 environment is unchanged.

This checklist verifies the pilot against the source; it does not claim that the user has accepted its teaching quality or that the rest of the course has been revised to this standard.

Validation: the course data verifier passes; Lessons 2–6 in the shared authoring module are byte-for-byte equivalent as parsed data. The other lesson modules were untouched. Lesson 1 passed browser checks for expandable topic links, code copy, widths 390/768/1440, and absence of browser errors. Desktop and mobile screenshots are in `.playwright-mcp/lesson-01-review-*.png`.
