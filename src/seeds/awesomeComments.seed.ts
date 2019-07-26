import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { AwesomeComment } from '../entity/AwesomeComment';
import { User } from '../entity/User';

export default class CreateAwesomeComments implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(AwesomeComment)()
      .map(async (awesomeComment: AwesomeComment) => {
        awesomeComment.user = await factory(User)().seed();
        return awesomeComment;
      })
      .seedMany(10);
  }
}
