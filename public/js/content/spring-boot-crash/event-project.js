// Generated from the local demo; never a claim of recovered video code.
window.JT.bootCrashEventSources = [
  {
    "name": "pom.xml",
    "code": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.codesnippet</groupId>\n  <artifactId>spring-events-demo</artifactId>\n  <version>1.0.0</version>\n  <properties>\n    <maven.compiler.release>25</maven.compiler.release>\n    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n  </properties>\n  <!-- Supply -Dboot.version explicitly: the captions do not name its version. -->\n  <dependencyManagement>\n    <dependencies>\n      <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-dependencies</artifactId>\n        <version>${boot.version}</version>\n        <type>pom</type>\n        <scope>import</scope>\n      </dependency>\n    </dependencies>\n  </dependencyManagement>\n  <dependencies>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n  </dependencies>\n  <build>\n    <plugins>\n      <plugin>\n        <groupId>org.apache.maven.plugins</groupId>\n        <artifactId>maven-compiler-plugin</artifactId>\n        <version>3.14.1</version>\n      </plugin>\n      <plugin>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-maven-plugin</artifactId>\n        <version>${boot.version}</version>\n        <configuration><mainClass>com.codesnippet.springeventsdemo.SpringEventsDemoApplication</mainClass></configuration>\n        <executions><execution><goals><goal>repackage</goal></goals></execution></executions>\n      </plugin>\n    </plugins>\n  </build>\n</project>\n"
  },
  {
    "name": "src/main/java/com/codesnippet/springeventsdemo/controllers/OrderController.java",
    "code": "package com.codesnippet.springeventsdemo.controllers;\n\nimport com.codesnippet.springeventsdemo.services.OrderService;\nimport org.springframework.web.bind.annotation.PathVariable;\nimport org.springframework.web.bind.annotation.PostMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class OrderController {\n    private final OrderService orderService;\n\n    public OrderController(OrderService orderService) {\n        this.orderService = orderService;\n    }\n\n    @PostMapping(\"/order/{orderId}\")\n    public void createOrder(@PathVariable(\"orderId\") String orderId) {\n        orderService.createOrder(orderId);\n    }\n}\n"
  },
  {
    "name": "src/main/java/com/codesnippet/springeventsdemo/events/OrderCreatedEvent.java",
    "code": "package com.codesnippet.springeventsdemo.events;\n\npublic class OrderCreatedEvent {\n    private final String orderId;\n\n    public OrderCreatedEvent(String orderId) {\n        this.orderId = orderId;\n    }\n\n    public String getOrderId() {\n        return orderId;\n    }\n}\n"
  },
  {
    "name": "src/main/java/com/codesnippet/springeventsdemo/listeners/EmailNotificationListener.java",
    "code": "package com.codesnippet.springeventsdemo.listeners;\n\nimport com.codesnippet.springeventsdemo.events.OrderCreatedEvent;\nimport org.springframework.context.event.EventListener;\nimport org.springframework.stereotype.Component;\n\n@Component\npublic class EmailNotificationListener {\n    @EventListener\n    public void handleOrderCreatedAndSendEmail(OrderCreatedEvent event) {\n        System.out.println(\"Sending email for order \" + event.getOrderId());\n    }\n}\n"
  },
  {
    "name": "src/main/java/com/codesnippet/springeventsdemo/listeners/LogOrderDetailsListener.java",
    "code": "package com.codesnippet.springeventsdemo.listeners;\n\nimport com.codesnippet.springeventsdemo.events.OrderCreatedEvent;\nimport org.springframework.context.event.EventListener;\nimport org.springframework.stereotype.Component;\n\n@Component\npublic class LogOrderDetailsListener {\n    @EventListener\n    public void logOrderCreated(OrderCreatedEvent event) {\n        System.out.println(\"Order placed for order ID \" + event.getOrderId());\n    }\n}\n"
  },
  {
    "name": "src/main/java/com/codesnippet/springeventsdemo/services/OrderService.java",
    "code": "package com.codesnippet.springeventsdemo.services;\n\nimport com.codesnippet.springeventsdemo.events.OrderCreatedEvent;\nimport org.springframework.context.ApplicationEventPublisher;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class OrderService {\n    private final ApplicationEventPublisher publisher;\n\n    public OrderService(ApplicationEventPublisher publisher) {\n        this.publisher = publisher;\n    }\n\n    public void createOrder(String orderId) {\n        System.out.println(\"Order created for order ID \" + orderId);\n        publisher.publishEvent(new OrderCreatedEvent(orderId));\n    }\n}\n"
  },
  {
    "name": "src/main/java/com/codesnippet/springeventsdemo/SpringEventsDemoApplication.java",
    "code": "package com.codesnippet.springeventsdemo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class SpringEventsDemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(SpringEventsDemoApplication.class, args);\n    }\n}\n"
  }
];
window.JT.bootCrashEventResult = {
  "jdk": "java 25.0.4.1 2026-08-18 LTS",
  "bootVersion": "3.5.16",
  "requests": 2,
  "status": "passed",
  "assertions": [
    "POST /order/1 returns 200",
    "POST /order/2 returns 200",
    "Order service publishes both IDs",
    "Email listener receives both IDs",
    "Logging listener receives both IDs"
  ],
  "output": [
    "Order created for order ID 1",
    "Sending email for order 1",
    "Order placed for order ID 1",
    "Order created for order ID 2",
    "Sending email for order 2",
    "Order placed for order ID 2"
  ]
};
