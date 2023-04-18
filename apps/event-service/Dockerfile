FROM node:18-alpine 

WORKDIR /usr/src/app

COPY /dist/apps/event-service .

RUN npm install --prod

ENV NODE_ENV production

CMD node ./main.js

