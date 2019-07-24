import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';
import { UserAwesomeCommentStar } from './UserAwesomeCommentStar';

@Entity({
  name: 'awesome_comments'
})
export class AwesomeComment {
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

  @ManyToOne(type => User, user => user.awesomeComments)
  user: User;

  @OneToMany(
    type => UserAwesomeCommentStar,
    userAwesomeCommentStar => userAwesomeCommentStar.awesomeComment
  )
  userAwesomeCommentStars: UserAwesomeCommentStar[];
}
