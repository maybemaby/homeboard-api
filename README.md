# Homeboard - Express API

API that could theoretically be used for powering a Home dashboard for organization/communication between multiple
members of a household. Personal use for establishing a baseline project for future node api structure.

# Table of Contents
1. [Features](#features)
2. [Technology](#technology)
3. [Structure](#structure)
4. [Pre-Production tasks](#pre-production-tasks)
5. [Todo](#todo)

<br>

# Features
 - Scheduled Events
 - Renewing Tasks
 - Public messages
 - JWT Auth

<br>

## Technology
- Expressjs
- Prisma with a RDB
- Typescript
- Logging - Winston
- passport

# Structure

## config.ts
Currently holds only the config for logging. Future runtime configs to be added here.

## /data
Contains the connection to the database and exposes an interface for making queries. Currently just exports the Prisma Client instance. Could use a repository to abstract it the client away and make it easier to swap data sources later.

## /models
Contains the interfaces and schema for tables in the database. Exists separately from the database.

## /services
Services for each of the models. Provides an interface for CRUD business logic in between the data layer and controllers. Currently tied to the Prisma Client, can use a repository interface as previously mentioned to improve modularity.

## /controllers
Controllers to pass requests from routers to a service and return a response from the service.

## /routers
Creates the url structure of the api and connects routes to controllers.

## /middleware
Express middlewares for auth, logging, etc.

# Pre-Production tasks
Repo is not ready for production as is. Some necessary changes would be:

- Change JWT to be sent through httpOnly cookie
- Add rate limiting
- Add caching
- Change to a production SQL database (Postgres, MySQL, etc.)
- Add password strength checker


## Todo

- Rotating log file handler

[Top](#table-of-contents)