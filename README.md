# book-rental-control-backend

NodeJS api to manage book rental


### how to run application?

- npm run start

### create migration

- npm run migration:create ./src/infra/migrations/MigrationName


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
