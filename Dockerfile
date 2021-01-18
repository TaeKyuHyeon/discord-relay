FROM node:14.15.4-stretch

ADD . /app

WORKDIR /app
RUN chmod -R 777 .
# TODO: Add eslint and test
# TODO: Add npm build
RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]
