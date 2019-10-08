# soup hub service

An application where collect and share awesome soups. this repository is the service/backend of the soup hub.

## usage

- `git clone https://github.com/buuug7/soup-hub-service.git`
- `cd soup-hub-service`
- `npm install`
- edit `.env` file setting give you own configuration
- `npm run start` start you work
- the `test/Api.http` show the whole api

## production

- run `npm run build`
- change the connection to production with rename it to default name in `ormconfig.js`
- `docker build --tag buuug7/soup-hub:1.0.0`
- `docker-composer up`
