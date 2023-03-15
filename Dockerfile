FROM node:14

WORKDIR /var/app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="file:dev.db"

EXPOSE 3000

CMD [ "npm", "start" ]