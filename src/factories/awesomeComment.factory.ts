import { define, factory } from 'typeorm-seeding';
import { AwesomeComment } from '../entity/AwesomeComment';
import * as Faker from 'faker';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

define(AwesomeComment,    (faker: typeof Faker, settings: {}) => {
  const awesomeComment = new AwesomeComment();

  awesomeComment.content = faker.lorem.paragraphs();
  awesomeComment.more = {};
  awesomeComment.createdAt = faker.date.past();
  return awesomeComment;
});
