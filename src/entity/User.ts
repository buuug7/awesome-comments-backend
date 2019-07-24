import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { AwesomeComment } from './AwesomeComment';
import { UserAwesomeCommentStar } from './UserAwesomeCommentStar';
import { type } from 'os';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  rememberToken: string;

  @Column({
    nullable: true
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

  @OneToMany(type => AwesomeComment, awesomeComment => awesomeComment.user)
  awesomeComments: AwesomeComment[];

  @OneToMany(
    type => UserAwesomeCommentStar,
    userAwesomeCommentStar => userAwesomeCommentStar.user
  )
  userAwesomeCommentStars: UserAwesomeCommentStar[];
}
