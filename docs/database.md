# database

## use knex cli
There has some problem when use knex migration with dotenv. the knex cli can not parse `.env` file by dotenv correctly. so, a new npm script was added for this issue. always use the `npm run knex ..` instead of `knex ...`

## create database
```mysql
create database `awesome_comments` default charset utf8mb4 collate utf8mb4_unicode_ci;
```



## database schema

### users tables 

+ id
+ name
+ email
+ password
+ remember_token
+ created_at
+ updated_at