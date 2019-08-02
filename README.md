# soup hub

An application where collect and share awesome soups.

## usage

- `git clone https://github.com/buuug7/soup-hub.git`
- `cd soup-hub`
- `npm install`
- edit `.env` file setting give you own configuration
- `npm run start` start you work

## setup development mysql server

```
cd soup-hub
docker-composer -f docker-dev-mysql.yml up
```

## production

+ run `npm run build`
+ change the connection to production with rename it to default name in `ormconfig.js`
+ `docker build --tag buuug7/soup-hub:1.0.0`
+ `docker-composer up`
