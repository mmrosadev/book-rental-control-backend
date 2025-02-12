# book-rental-control-backend

NodeJS api to manage book rental

### how to run this application by docker?

> docker compose up -d book-rental-control

> docker compose exec book-rental-control bash

> npm run migration:run

### how to run this application on local without docker?

- Install postgres
- Create conections for database
- Create database
- Adjust enviroment's variable in .env

> npm run start

> npm run migration:run


### folder structure

- src
    - domain
        - entity (Domain entities)
        - usecase
    - infra
        - datasource
            - database
                - entities (Persistence entities)
                - migrations
            - http
                - controller
        - repository
