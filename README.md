# Homeboard - Express API

## Technology
- Expressjs
- Prisma with a RDB
- Typescript

# Structure

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