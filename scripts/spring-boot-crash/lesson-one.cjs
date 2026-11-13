module.exports = {
  number: 1,
  title: 'Spring Boot Roadmap',
  compact: true,
  hideOutline: true,
  intro: 'In this course, we are going to learn Spring Boot step by step. We will start by running a small application, understand how its code works, and then move into databases, security, testing, and deployment. Let’s first see how these topics connect.',
  sections: [
    {heading:'Your Spring Boot learning path',paragraphs:[
      'Think of this course as a path. First, we will get an application running. Then we will understand its parts, build its features, and learn how to test and deploy it. Follow the map from 1 to 6.'
    ],roadmap:[
      {title:'Start the application',topics:'Spring Boot basics · First project · Maven or Gradle',goal:'Get a small project running.'},
      {title:'Connect the pieces',topics:'Annotations · Dependency injection',goal:'Understand how classes work together.'},
      {title:'Manage the application',topics:'Configuration · Profiles · Beans · Lifecycle · Scopes',goal:'Understand settings and managed objects.'},
      {title:'Build its features',topics:'Database access · REST APIs · Security',goal:'Work with data and protect access.'},
      {title:'Test and support it',topics:'Logging · Exceptions · Cache · Interceptors · Scheduling · Tests · Actuator',goal:'Check behavior and understand failures.'},
      {title:'Deploy and connect services',topics:'Tomcat · Docker · CI/CD · Cloud · Microservices',goal:'Learn how applications run beyond the IDE.'}
    ],paragraphsAfter:['You do not need to learn all six stages today. In this lesson, we are looking at what each stage is for. The next lesson starts with project setup.']},
    {heading:'What is Spring Boot?',paragraphs:[
      'Spring Boot helps us build and run Java applications using the Spring Framework. It gives us easier configuration, starter dependencies, and an integrated server.',
      'What does that mean for us? We can start working on our application without first setting up a separate server. Spring Boot also provides production features, including Actuator, which we will use to inspect the application later.'
    ]},
    {heading:'What are we going to build?',paragraphs:[
      'We will begin with a small book application containing four simple APIs. First, we will create the project, open it in IntelliJ IDEA, and run it.',
      'Once it runs, we need to understand where the code belongs. That is where layered architecture comes in: we will look at the controller, service, and repository layers, along with the test packages.',
      'For now, remember the sequence: get a small application running, then understand how its parts fit together. We will implement the book example in its own lesson.'
    ],flow:['HTTP request','Controller: receives the request','Service: handles business logic','Repository: accesses data'],paragraphsAfter:['Read this flow from left to right. The controller receives the request, the service performs the work, and the repository handles data access. Separating these responsibilities helps us understand where each piece of code belongs.']},
    {heading:'How will we add libraries?',paragraphs:[
      'Our application will need libraries. For example, when we start writing tests, we will need JUnit. Do we have to download and manage every library ourselves?',
      'This is where a build tool helps us. We will use Maven to build the project and manage its dependencies. We declare a dependency in pom.xml, and Maven downloads it and makes it available to the project.',
      'Gradle is another build tool mentioned in this roadmap. The book project uses Maven, so that is the tool we will follow for that example.'
    ]},
    {heading:'How does Spring know what our classes do?',paragraphs:[
      'As we read the project, we will see names starting with @. These are annotations. We will learn how they configure the application, identify its components, and map incoming requests.',
      'You do not need to memorize these names now. We will use examples to explain them as we reach the relevant lessons.'
    ],list:[
      '@SpringBootApplication for the application setup.',
      '@Controller, @RestController, @RequestMapping, @RequestParam, and @RequestBody for handling requests.',
      '@Component, @Service, @Repository, and @Autowired for the application’s components and dependencies.'
    ],paragraphsAfter:[
      'Next, we will look at dependency injection and inversion of control. If one class needs another object, how does it receive that object? We will compare field, setter, and constructor injection, including their advantages and tradeoffs.'
    ]},
    {heading:'Let’s understand configuration with an example',paragraphs:[
      'Suppose our application uses a YouTube channel URL in several places. Now imagine that URL changes. Updating a separate copy in every class would be inconvenient.',
      'Instead, we can keep the URL under one property name in application.properties:'
    ],code:{title:'application.properties',lang:'text',text:'youtube.code.snippet=<your-channel-url>'},paragraphsAfter:[
      'Here, youtube.code.snippet is the property name. Replace the placeholder on the right with the channel URL. The name is a readable reconstruction of the spoken example.',
      'Now we have one place to change the setting. We will learn how Java code reads it in the configuration lessons.',
      'What if our test environment needs a different value from production? We will use profiles for that. We will also see application.yaml, which lets us organize settings hierarchically.'
    ]},
    {heading:'Who creates the objects in our application?',paragraphs:[
      'That brings us to Spring beans. A bean is a Java object managed by Spring. We will learn how Spring creates it, where it is stored, and what happens from its creation until its destruction. That sequence is its lifecycle.',
      'We also need to decide when an object should be reused. This is called its scope, selected using @Scope. Singleton is the default scope introduced in this course.'
    ],list:[
      'Singleton: reuse one instance.',
      'Prototype: create an instance when requested from Spring.',
      'Request: associate an instance with an HTTP request.',
      'Session: associate an instance with an HTTP session.'
    ],paragraphsAfter:[
      'These differences will be easier to see when we run the scope examples. At this point, the important connection is that injection, beans, and scopes explain how the objects in our application work together.'
    ]},
    {heading:'Then we will build out the application',paragraphs:[
      'Once we understand the foundations, we can work with stored data using Spring Data JPA and build on the book application’s REST APIs. The roadmap also introduces JDBC as a data-access option.',
      'Then we need to secure the application. We will study authentication, authorization, users, and roles with Spring Security.',
      'A working application needs more than its main features. We also need to understand what it is doing, handle failures, and test its behavior. That is why the course includes:'
    ],list:[
      'Logging to record application activity, and exception handling for failures such as controller exceptions.',
      'Caching and cache management.',
      'Interceptors for processing requests before the controller and participating in response processing.',
      'Scheduling for running tasks on a schedule.',
      'JUnit and Mockito for tests, including mocking injected collaborators.',
      'Actuator: add its dependency to inspect health, metrics, and beans through its endpoints.'
    ]},
    {heading:'Where does deployment fit?',paragraphs:[
      'When we run the web application, its integrated Tomcat server hosts it. Later, we will look at the deployment topics in this roadmap: Docker, CI/CD with Jenkins, and cloud platforms such as AWS, Azure, and Google Cloud.',
      'The roadmap then looks ahead to microservices. Imagine a request passing through ten services. If it fails, how will we find the service where it went wrong? That is the problem behind the tracing topics introduced here.'
    ],list:[
      'Eureka introduces service registration and discovery.',
      'Sleuth associates a trace ID with a request; Zipkin helps visualize its journey across services.',
      'An API gateway receives a request and decides which service should handle it.',
      'Spring Cloud Config keeps shared configuration in one central place instead of separate copies in every service.'
    ],paragraphsAfter:[
      'These are introductions from the 2024 roadmap, not implementations we need to complete now. First, let’s get comfortable with one Spring Boot application.'
    ]},
    {heading:'Let’s get started',paragraphs:[
      'We now have a path: run a project, understand Spring’s foundations, build its features, and then study how to support and deploy it.',
      'In the next lesson, we will set up the first project. We will use your existing Java 25, Maven, and IntelliJ IDEA environment for local practice.'
    ]}
  ],
  remember:[
    'Start with one small application and understand how it works.',
    'Learn the foundations before moving to data access, security, and deployment.'
  ],
  evidence:'Lesson 1 only; all 13 source paragraphs retained at introductory depth: Boot benefits/server/Actuator; book/four APIs/IntelliJ/layers/test packages; Maven/Gradle/pom/JUnit; annotations; DI/IoC/three forms/tradeoffs; channel URL/property/YAML/profiles; bean lifecycle/storage/scopes/default/@Scope; data/JPA/JDBC/REST/security; logging/exceptions/cache/interceptors/scheduling/testing; Tomcat/Docker/CI-CD/Jenkins/cloud; Eureka/tracing/Sleuth/Zipkin/gateway/central configuration. Conversational teaching revision; no new runnable demonstration or mastery guarantee.'
};
