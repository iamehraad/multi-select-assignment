FROM maven:3.9.6-eclipse-temurin-21

WORKDIR /app

COPY ./product/pom.xml .

RUN mvn dependency:go-offline

COPY ./product/src ./src

EXPOSE 8080

ENTRYPOINT ["mvn", "spring-boot:run"]