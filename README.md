## Hello I am Tejas and this is Vocally backend Project

## Technology and Components inside project 😎

- It's Backend for Library Managment which currently have Student and Book Crud which is Ready to handle requests.
- build with docker and docker compose
- Added JWT Auth 
- For testing used **JEST** 
- Architecture Diagram
- class based Approch
- Can used with this (MongoDb, SQl server, SQLite, Postgress, etc) Databases because **prisma ORM** is in used (Add DATABASE_URL veriable in .env file with your DB Url)
- Custom Logger using Event Listener.
- Rate limmiter is in Use to Limit Api Calls
- REST and GraphQL Both are available 
      - eg. 1. REST -> **npm run start**  OR **npm run start:dev**
      -    2. GraphQl -> **npm run start:Gql**
      -    3. Both in same time -> **npm run start:Gql:dev** (but run this command first: **npx prisma migrate dev --name init**)


## How to Start Application

- if you have "Docker" install in your system than turn on docker demon and inside the project run ** docker-compose up ** 🤗
- To run Locally - you need to have nodeJS pre install  😃
    - step a: install dependancy : **npm install**
    - step b: start project      : ** npm run start **   OR    **npm run start:dev**
