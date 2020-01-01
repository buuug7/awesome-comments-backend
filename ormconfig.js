module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456789',
    database: 'soup_hub',
    synchronize: true,
    logging: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    },
    seeds: ['src/seeds/**/*.seed.ts'],
    factories: ['src/factories/**/*.factory.ts']
  },
  {
    name: 'prod',
    type: 'mysql',
    host: 'soup-hub-mysql',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'soup_hub',
    synchronize: true,
    logging: false,
    entities: ['build/entity/**/*.js'],
    migrations: ['build/migration/**/*.js'],
    subscribers: ['build/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'build/entity',
      migrationsDir: 'build/migration',
      subscribersDir: 'build/subscriber'
    },
    seeds: ['build/seeds/**/*.seed.js'],
    factories: ['build/factories/**/*.factory.js']
  }
];
