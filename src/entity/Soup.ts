import {
  BaseEntity,
  Column,
  createQueryBuilder,
  Entity,
  getManager,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';
import { UserSoupStar } from './UserSoupStar';

@Entity()
export class Soup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text'
  })
  content: string;

  @Column({
    nullable: true,
    type: 'json'
  })
  more: object;

  @Column({
    default: false
  })
  active: boolean;

  @Column({
    nullable: true
  })
  createdAt: Date;

  @Column({
    nullable: true
  })
  updatedAt: Date;

  @Column({
    nullable: true
  })
  deletedAt: Date;

  @ManyToOne(type => User, user => user.soups, {
    eager: true
  })
  user: User;

  /**
   * star the soup with given user
   * @param user
   */
  public star(user: User) {
    return createQueryBuilder()
      .insert()
      .into(UserSoupStar)
      .values([
        {
          userId: user.id,
          soupId: this.id,
          createdAt: new Date()
        }
      ])
      .execute();
  }

  /**
   * unStar the soup with given user
   * @param user
   */
  public async unStar(user: User) {
    const userSoupStar = await UserSoupStar.findOne({
      userId: user.id,
      soupId: this.id
    });

    if (userSoupStar) {
      return userSoupStar.remove();
    }
  }

  /**
   * determine the soup is star by give user
   * @param user
   */
  async isStarByGivenUser(user: User): Promise<boolean> {
    const count = await getManager()
      .createQueryBuilder(UserSoupStar, 'userSoupStar')
      .where('userId = :userId AND soupId = :soupId', {
        userId: user.id,
        soupId: this.id
      })
      .getCount();

    return count > 0;
  }

  /**
   * return the star count number of the soup
   */
  async starCount(): Promise<number> {
    return await getManager()
      .createQueryBuilder(UserSoupStar, 'userSoupStar')
      .where('soupId = :soupId', {
        soupId: this.id
      })
      .getCount();
  }



}

