FROM node:18-alpine 

WORKDIR /usr/src/app

COPY /dist/apps/auth-service .

RUN npm install --omit=dev

ENV NODE_ENV production

CMD node ./main.js

