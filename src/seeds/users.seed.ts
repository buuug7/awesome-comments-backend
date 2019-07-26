import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entity/User';
import { hashSync } from 'bcrypt';

export default class CreateUsers implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'buuug7',
          email: 'youpp@126.com',
          password: hashSync('111111', 3),
          createdAt: new Date()
        }
      ])
      .execute();

    // await factory(User)().seedMany(10);
  }
}
