# Currency Exchange Service

A simple RESTful service implemented using Node.js, Fastify, and PostgreSQL to fetch and serve currency exchange rates.

## Features:
RESTful API endpoints to retrieve all currencies and individual currency by ID.
Automatic updating of currency exchange rates from the National Bank of Kazakhstan.
Authentication via bearer token.
Written in TypeScript for type safety.
Dockerized for easy setup and deployment.

## Prerequisites:
- Node.js
- PostgreSQL
- Docker & Docker Compose (optional)

## Getting Started:
Setup Environment Variables: Copy the `.env.example` to `.env` and update the variables as needed.

### Install Dependencies: 
Run ```npm install```

### Run the Application:

#### Without Docker:
Start your PostgreSQL database.
Run the application using `npm start`.

#### With Docker:
Start both the application and PostgreSQL using `docker-compose up`.


### Fetch Latest Currency Rates:
Run `npm run command fetch` to fetch and update the currency rates in the database.

### Access the API:

Use endpoints:

GET `/currencies` to fetch all currencies.
GET `/currency/:id` to fetch a specific currency by its ID.

### Running Tests:
Ensure that the test database is specified in the `.env` file.

Run `npm test`.

### API Authentication:
Access to the API is secured using bearer token authentication. Include your token in the Authorization header of your requests.

```
curl --location 'http://localhost:3000/currencies' \
--header 'Authorization: Bearer some_secret_key'
```

