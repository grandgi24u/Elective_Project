# Web development project

## Authors

- Clément Grandgirard - [@grandgi24u](https://www.github.com/grandgi24u)
- Valentin Deussen - [@valentinDsn](https://github.com/ValentinDsn)
- Léo Pignatone - [@pignatone](https://github.com/Pignatone)
- Geoffrey Keff - [@geoffreyKeff](https://github.com/GeoffreyKeff)

## Goals
The project takes place as part of our computer engineering training at the CESI Nancy.

This project aims to make you design, build, deploy, test and use a distributed software platform. The business vocation of this platform is the convergence and processing of commercial offers in the field of catering. 
Several types of users can consume the services offered by this platform: 
- the end user
- the restaurateur
- the delivery person
- the third-party developer
- the sales department (company carrying the convergence offer)
- the technical service (company carrying of the convergence offer).

It is therefore a service offering catering via the internet. It is the technical hub for managing workflows.

## Run the project
To launch the project, you will need to clone it on your computer.
### Prerequisite : 
 - MongoDB
 - Node.js
 - C# (For the sales department program)
 - SQL Server Database
 - Vue.js
 - Optional : Docker

### Launch

For each microservice you need to create an .env file in the project root which should look like this: 

    PORT=MicroservicePort
    DB_NAME=MicroserviceName
    DB_HOST=mongodb://0.0.0.0/MicroserviceName

For the ApiGateway you need to add `SECRET_KEY=` for jwt authentification.
When you have all the .env files. Run each microservices and apigateway using command : 

> npm run start

For the view, you only need to run the command : 

> npm run serve

**Everything can be run using Docker**
