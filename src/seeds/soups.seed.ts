import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Soup } from '../entity/Soup';
import { User } from '../entity/User';

export default class createSoups implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Soup)()
      .map(async (soup: Soup) => {
        soup.user = await factory(User)().seed();
        return soup;
      })
      .seedMany(10);
  }
}
