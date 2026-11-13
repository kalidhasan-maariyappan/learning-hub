FROM eclipse-temurin:25-jre
WORKDIR /app
COPY target/commerce-1.0.0.jar app.jar
RUN mkdir -p /app/data /app/uploads && chown -R 10001:10001 /app
USER 10001
ENTRYPOINT ["java","-jar","app.jar"]
