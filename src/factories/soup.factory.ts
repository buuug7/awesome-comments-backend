import { define, factory } from 'typeorm-seeding';
import { Soup } from '../entity/Soup';
import * as Faker from 'faker';

define(Soup, (faker: typeof Faker, settings: {}) => {
  const soup = new Soup();

  soup.content = faker.lorem.paragraphs();
  soup.more = {};
  soup.createdAt = faker.date.past();
  return soup;
});
