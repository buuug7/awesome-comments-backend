# awesome comments backend 

An application where collect and share awesome comments, build on top of [koa](https://github.com/koajs/koa) and other awesome open source libraries, also the application has been inspired by great PHP framework [laravel](https://github.com/laravel/laravel). 

## usage
+ `git clone https://github.com/buuug7/awesome-comments.git`
+ `cd awesome-comments`
+ `npm install`
+ edit `.env` file setting give you own configuration
+ `npm run knex migrate:latest` migrate your database tables
+ `npm run knex seed:run` seed faker data into tables
+ `npm run start` start you work


## directory structure
+ **app** the code code of your application
    + controllers
    + models
+ **config** contains all your application's configuration file
+ **database** contains your database migration and seeds
+ **docs** all of your applications documents
+ **routes** contains all of the route definitions for your application
+ **test** contains all your automated tests


## TODO
+ add TEST
+ add ORM [bookshelf]