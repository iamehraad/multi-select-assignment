# Backend springboot

A simple Kotlin/springboot application works as a backend for our multi-select functionality.
This project is responsible for reading data from the provided file and expose its data via a REST API

## Teach stack

- Kotlin
- Springboot

---

## Project Structure

A simple standard springboot structure consisting:

- Controllers: Having our single controller file for products
- Service: Reading our data file and provide it for API

---

## How to run?

**Use docker for full experience, follow [here](../../README.md)**

Make sure port 8080 is not in use then:

Run development:
`mvn spring-boot:run`

Build:
`mvn -B package --file pom.xml`

