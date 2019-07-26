import { define } from 'typeorm-seeding';
import { User } from '../entity/User';
import * as Faker from 'faker';
import { hashSync } from 'bcrypt';

define(User, (faker: typeof Faker, settings: {}) => {
  const user = new User();

  user.name = faker.name.findName();
  user.email = faker.internet.email();
  user.password = hashSync(faker.random.word(), 3);
  user.createdAt = faker.date.past();

  return user;
});
