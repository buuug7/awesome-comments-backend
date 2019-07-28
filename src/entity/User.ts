import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  BaseEntity,
  getManager,
  createQueryBuilder
} from 'typeorm';
import { Soup } from './Soup';
import { UserSoupStar } from './UserSoupStar';
import { type } from 'os';
import { simplePagination } from '../common/pagination';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    select: false
  })
  password: string;

  @Column({
    nullable: true,
    select: false
  })
  rememberToken: string;

  @Column({
    nullable: true,
    select: false
  })
  github: string;

  @Column({
    nullable: true
  })
  createdAt: Date;

  @Column({
    nullable: true
  })
  updatedAt: Date;

  @OneToMany(type => Soup, soup => soup.user)
  soups: Soup[];

  /**
   * get the soups of user already star
   */
  public starSoups() {
    const queryBuilder = createQueryBuilder(Soup)
      .leftJoinAndSelect('Soup.user', 'User')
      .innerJoinAndSelect(
        UserSoupStar,
        'UserSoupStar',
        'UserSoupStar.soupId = Soup.id'
      )
      .where('UserSoupStar.userId = :userId', { userId: this.id });

    return simplePagination(queryBuilder, {});
  }
}
