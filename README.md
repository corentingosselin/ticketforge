# Ticketforge


![image](https://github.com/corentingosselin/ticketforge/assets/8132994/8d2e28fe-7108-467a-8f1e-f4a009dc796a)

<img width="1909" alt="image" src="https://github.com/corentingosselin/ticketforge/assets/8132994/96fbc7a6-10df-41dc-821f-513ffb1fa665">




## How to run the project

Run `npm run docker:prod` to start the docker containers. Navigate to http://localhost:3000/api/openApi to see the app running.

## If you need to run the project locally and manually

Run `npm i -g pnpm` to install pnpm globally. Then run `pnpm i` to install all dependencies.
Run `pnpm run docker` to start the docker containers like databases and rabbitmq.
Run `pnpm start` to start the app. Navigate to http://localhost:3000/api/openApi to see the app running.

## How to generate the migrations

If you made changes to the entities, change the package.json to target the right service:
```
  "mikro-orm": {
    "useTsNode": true,
    "tsConfigPath": "tsconfig.orm.json",
    "configPaths": [
      "./libs/event-service/core/src/mikro-orm.config.ts"
    ]
  },
```
 Then run `pnpm run typeorm:migration:generate` to generate the new migration files.   

## How to run the migrations

Just starts the docker containers, you also need to recreate the flyway images

## Build the app

Run `npm run build:all` to build the app.


## How to run the tests

Run `nx run-many --target=test --all` to run all tests.


