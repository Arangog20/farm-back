<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# API Farm - Manager of animal association in corrals.

## Project Description
This project is a solution developed in NestJS with a MongoDB database to manage the association of animals in pens within a farm. The REST API provides functionalities to create pens and animals, set association restrictions, and visualize animals in a pen, among others.

## Features

- **Pen Management**: Create pens with a defined capacity limit.
- **Animal Management**: Create animals and assign them to pens.
- **Association Restrictions**: Define association restrictions for animals, specifying which animals cannot live together in the same pen.
- **Animal Summary**: Endpoint that provides a summary of the animals grouped by pen, highlighting those with high danger.
- **Average Age Calculation**: Endpoint to calculate the average age of the animals in a specific pen.


## Main Endpoints
### Barnyard Endpoints (/api/v1/pen)
**POST** /create: Creates a new pen.
**POST** /add-animal: Associates an existing animal to a specific pen.
**GET** /find-all: Gets all existing pens.
**GET** /find/name: Searches for a specific pen by name.
**PUT** /update/name: Updates the information of a pen by name.
**DELETE** /delete/name: Deletes a specific corral by name.
**GET** /age-range/penName: Calculates the age range of the animals in a specific pen.

### Animal Endpoints (/api/v1/animal)
**POST** /create: Creates a new animal.
**GET** /find-all: Gets all registered animals.
**GET** /find/:_id: Searches for a specific animal by its ID.
**PUT** /update/:_id: Updates the information of an animal by its ID.
**DELETE** /delete/:_id: Deletes a specific animal by its ID.

### Association Restrictions Endpoints (/api/v1/restrictions)
**POST** /create: Creates a new association restriction between animals.
**GET** /find-all: Gets all association restrictions.
**GET** /find/animalType: Searches for association restrictions for a specific type of animal.
**PUT** /update/animalType: Updates an association constraint by animal type.
**DELETE** /delete/animalType: Deletes an association constraint by animal type.


### Skills
- TypeScript
- NestJs
- MongoDB


## 🛠 Project Set-Up

### Installing NestJs:
To install NestJs, follow these steps:

1. Open the terminal (It is recommended to use GitBash or your IDE's terminal).
2. Execute the following command to install NestJs on your device:

```bash
  npm i -g @nestjs/cli
```

### Repository Installation:
To clone the repository to your local machine and access the project's files, use the following command:

```bash
  git clone linkrepositorio
```

This ensures that the repository is available on your device for you to use its information and work on it.

#### Dependencies used:
- `@nestjs/mapped-types`: Facilitates the creation of mapped types in NestJS.
- `@nestjs/swagger`: Provides integration with Swagger to generate automatic API documentation.
- `class-validator`: Adds validations to TypeScript classes.
- `class-transformer`: Allows safe and efficient object transformation.
- `@nestjs/config`: Configuration module for NestJS.
- `@nestjs/mongoose` & `mongoose`: Packages for interacting with MongoDB databases.

#### Install dependencies
To use the project, we need to install all the necessary libraries and packages for its proper execution.

```bash
  npm install
```

### Running the project
To run the project, open your console and execute the following command to initialize the project:

```bash
  npm run start:dev
```

### Environment variables
We need to assign values to the environment variables for optimal project execution. In this case, the project's environment variables cover the persistence of the connection to our database and part of the token configuration and its expiration time.

```bash
  # PERSISTENCE CONNECTION in MongoDB - .env.
  ENVIRONMENT = 'YOUR ENVIRONMENT'
  
  DB_USER = 'YOU DB USERNAME'
  DB_PASSWORD = 'YOUR DB PASSWORD'
  DB_CLUSTER = 'YOUR DB CLUSTER'

  DB_CONNECTION = 'YOUR DB CONNECTION'
  DB_HOST = 'YOUR DB HOST'

  PORT = 'YOUR PORT'
```

### Postman
You can execute each of the services already established in the project through the endpoints that have been set up in a Postman collection, from creating, editing, deleting, and other actions.

Access the Postman collection:
- [Postman Collection](https://www.postman.com/red-flare-845361/public-manuela/collection/1a38q6t/farm?action=share&creator=33481513)

_Reminder: To use it, ensure that the project is running correctly._

### Swagger
You can execute each of the services established in the project using Swagger. Simply run the project and access a specific route, where you will find each of them and consume the one you require, displaying each option with its details.

```bash
  http://localhost:3000/api-doc
```

Or click on this shortcut:
- [Access the project Swagger](http://localhost:3000/api-doc)


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).