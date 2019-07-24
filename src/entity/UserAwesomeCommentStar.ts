import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { AwesomeComment } from './AwesomeComment';

@Entity()
export class UserAwesomeCommentStar {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt!: Date;

  @ManyToOne(type => User, user => user.userAwesomeCommentStars)
  user: User;

  @ManyToOne(
    type => AwesomeComment,
    awesomeComment => awesomeComment.userAwesomeCommentStars, {
      eager: true
    }
  )
  awesomeComment: AwesomeComment;
}
