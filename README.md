# Indigo

This project is a monorepo containing client application configurations and library projects which will each

be their own publishables. The libraries are left in there for fast dev cycle but can be moved when we need to.


## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Setting up demo API
 Install Mockoon software on you computer. Add a `GET` endpoint in Mockoon called `api/v1/staff_action/get_summary/`. Find the `get_summary.json` file in the  root of the project and import it into the body of the endpoint. Also add another `GET` endpoint called `api/v1/all_info/` and fill its body response with the `all_info.json` file at the root for the project and startup Mockoon on `http://localhost:3000`. When you run the 
 
 app, everything should work.




## Generate a client application

Run `ng g @nrwl/angular:app fnb` to generate an application for `fnb` company. This will also generate an e2e project for the app.

> You can also choose to generate a standalone application outside the monorepo for the client and point to the libs from npm or 

using git urls.


## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Project Structure

Application layouts, engine and templates are in their own projects in the libs and can be managed in their own publishable project 

if necessary. The libraries also include projects for ui-elements, directives, pipes that can also be extended.

## Engine
The engine to be codenamed `WiloJS` can expects to consume configuration. Therefore, the client applications should contain only 

configurations that follow the opinionated approach taken and expected my the engine (WiloJS).


## Deployment
To deploy each client project, you build the associated dockerfile for the client by tagging it first. This will generate an image 

which we can eiher create docker container from manually, use docker-compose or kubernetes to orchestrate the containers.

### Docker
docker run -d  -p 80:80 --env BACKEND_API_URL=http://localhost:3000 abassey/sil-fe:latest
