# Introduction

This project implements a RESTful API using NestJS and TypeORM that allows users to perform bank transactions and calculates bonuses based on certain conditions. Users can register, authenticate, perform transactions, and retrieve sorted lists of users based on their bonus balances.

## Requirements

Node.js >= 16.

## Installation

- Clone this repository or download the source code.
- Navigate to the project directory.
- Create the `.env` file (copy content from `.env.example`) and update the environment variables with your configuration. Make sure to provide the necessary database connection details.
- Run the following command to install the dependencies: `npm install`.

## Database Migrations

To create the necessary database tables, run the following command:

```bash
npm run typeorm migration:run -- -d src/helpers/typeorm-cli.ts
```

## Running the app

```bash
npm run start:dev 
```

## API Endpoints

The following API endpoints are available:

Authentication:

- **POST /api/auth/login**: Authenticate a user and generate an authentication token (JWT).

Bank Transactions:

- **POST /api/transactions/deposit**: Perform a deposit transaction.
- **POST /api/transactions/withdrawal**: Perform a withdrawal transaction.

Users:

- **POST /users**: Register a new user.

Sorting Users by Bonuses:

- GET **/api/users/sorted-by-bonus**: Retrieve a sorted list of users based on their bonus balances in ascending order.

For detailed API documentation and usage examples, please refer to the Swagger documentation http://localhost:3000/api.
