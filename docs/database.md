# database

## use knex cli
There has some problem when use knex migration with dotenv. the knex cli can not parse `.env` file by dotenv correctly. so, a new npm script was added for this issue. always use the `npm run knex ..` instead of `knex ...`

## bookshelf CRUD
```javascript
new Book({ title: '..' }).save()

new Book({ id: 1 }).fetch()

Book.where({ id: 1 }).fetch()
Book.where('favorite_color', 'red').fetch()
Book.where('favorite_color', '<>', 'red').fetch()
Book.query((q) => q.orderBy('updated_at'))
```

## create database
```mysql
create database `awesome_comments` default charset utf8mb4 collate utf8mb4_unicode_ci;
```

## database schema

### tables
+ users 
    + id
    + name
    + email
    + password
    + remember_token
    + created_at
    + updated_at

+ awesome_comments
    + id
    + user_id
    + content
    + reference
    + active
    + deleted_at
    + created_at
    + updated_at
    
### table relations
one user may have many awesome_comments, inverse one awesome_comment only belongs to one user.  