FROM node:20

WORKDIR /app

COPY . /app

RUN rm -rf node_modules && npm install

EXPOSE 4000

CMD [ "npm", "start" ]

