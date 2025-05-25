# Frontend react

A simple react project that allows users to select and filter a given list of strings.

## Teach stack

- React
- Vite
- Redux toolkit
- Jest + React testing library -> Unit tests
- Cypress -> e2e tests
- React-window -> lazy loading large list
- Axios -> data fetching
- Tailwind

---

## Project Structure

This project has 3 layers:

- Data: Responsible for networking
- Domain: Responsible for data managing and providing Presentation demands from Data
- Presentation: Where all UI exists

Some directories will not fall under these 3, such as cypress, you can avoid it.

---

## Development

Follow guide for working with layer below but keep in mind:

 - Each component directory, can not have more than 1 plain component in its root, you should always make a directory for inner ones
 - Unit tests should be written if applicable, same for e2e tests
 - All the types should come from Domain layer if they can be shared (mostly can as we need them in tests)

### How to work with layers?

**Data**:

Put all networking related logic here. Including types coming from backend, API client config...

**Domain**:

Put all data that is going to be needed in UI here. Domain layer is where state-management gonna live so its the core of
data.

This layer also responsible for communicating to Data layer therefore it receives the data, convert it to a domain
model, and pass it to presentation

**Presentation**:

Here we put all the UI component and purely UI related helpers such as hooks. This layer can only access **Domain** layer
and **not Data**.

---

## How to run?

**Use docker for full experience, follow [here](../README.md)**

Running frontend:

#### Step 1

download dependencies:
`npm install`

#### Step 2

run development:
`npm run dev`

---

#### Others

build with vite:
`npm run build`

run unit tests:
`npm run test`

run e2e test:
`npm run test:e2e`

run e2e tests in headless mode:
`npm run test:e2e:run`
