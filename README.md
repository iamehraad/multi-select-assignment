# Multi select project

This project contains the implementation of a simple react/vite application powered by a kotlin/springboot backend that
enables users
to search and select from a list of provided products.

This project uses docker to handle spinning up both frontend and backend and therefore you need to have **Docker**
installed
---

## Project Structure

#### Backend

A simple springboot application with minimum implementation just to read from data file and returns it to frontend

- [Backend README](backend/README.md)

#### Frontend

A react/vite application with e2e and unit testing

- [Frontend README](./frontend/README.md)

#### docker-compose

A directory that keeps our docker logic. Since we have 2 separate application for frontend and backend, having a docker
compose can ease the running of application.

It builds a container for each application with 1 command and lets you enjoy interacting with it.

#### Pipelines

We rely on github actions for our pipelines. Currently for sake of demo, we only trigger them manually.

You can find them here:

- [frontend github action](./.github/workflows/frontend.yml)
- [backend github action](./.github/workflows/backend.yml)

---

## How to  run?

#### Step 1

install [docker](https://www.docker.com/) on your machine

#### Step 2

    cd docker-compose

#### Step 3

    docker-compose up -d

#### Step 4

Wait for docker-compose to finish and then navigate to `http://localhost:300`

**NOTE**:
Please wait a bit longer until backend application completely starts. It can be the case that container is running
successfully but tomcat server is still not running completely.
This can take max 5-10 seconds

---

## FAQ

#### Why having 2 separate project instead of just using a full-stack framework like Nextjs?

As job description required knowledge of Kotlin and springboot, I decided to use this approach and separate my
frontend and backend. Otherwise using Nextjs with **API route** was the easiest solution to this assignment.

Still having Nextjs for frontend is possible but since Im not using any of its important features (routing, API routes,
layouts, SSR, SEO...), using it is not relevant here.

#### Why separating frontend into 3 main layer?

Its my preference to always keep data, domain and presentation layers separated even in frontend. It keeps the code more
readable and debugging easier. We can distinguish types that are being used within the application by letting only:

- Its where our UI lives and this layer can only read and use from domain layer (no direct access to data)
- Domain layer is our UI related logics, such as helpers, specific mocks and State management. This layer can only
  interact with data layer and it
- Data layer is where our networking happens. Our Axios client or any other client for API fetching lives there. This
  layer has access to no other layer and should be accessed only via Domain layer.

Of course there are some specific files and folders that we can not move under these layers such as our config files for
builder or pipeline configs. In case of Nextjs it would be for example our App or Page router directory which we can not
move.

---

## Challenges

#### Decision-making

As I have no contact person to ask questions, I had to make decisions myself based on what I like or dislike.

How I solved?

Trusting my GUT feelings :]

Open questions:

- Do I need to fetch data on each search and do the filtration on backend?
- Advanced CSS in Secondary Criteria, does it mean I need to write CSS and styling all by myself or I can use libraries
  like tailwind?

#### Coming up with project structure

Deciding on how to structure your project is always a though decision to be made, I considered possible solutions like
using full-stack frameworks or simply just mock a server with JS and different libraries.

How I solved?

Analyzing possible solutions like this:

- Using Nextjs  
  It will do the job, using API routes will reduce the effort for creating a separate web-server or even mock-server,
  Its good, however as job description requires some Koltin/springboot knowledge I decided to not use this path, thus
  Nextjs is a bit of an overkill as we are not using most of its feature. Assignment requires no Routing or SSR or
  SEO... .
- Using React with a mock-server  
  Again will do the job, Its easier than setting up a separate project and can be simply written in JS/TS with a lot of
  libraries that can be used.
  But no PROD ready app gonna live with a mock-server. This project is an assignment but still we can look at it like a
  real app
- Separate backend and frontend  
  As mentioned before, since job description requires Koltin/sprintboot knowledge I decided to go with this approach and
  use docker for running both projects together. Its easy for interviewer to run the project, also its easier to manage
  connections.
  Later on if I want to add another image such as a **database** it would be much easier to have docker already in
  place. 
   


