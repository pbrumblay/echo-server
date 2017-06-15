FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY server.js .

EXPOSE 8080
CMD node server.js
