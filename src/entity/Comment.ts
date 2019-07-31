import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  commentableType: string; // the comment belong to which type of resource

  @Column()
  commentableId: number; // the resource id for comment

  @ManyToOne(type => User, user => user.comments)
  user: number; // create user

  @ManyToOne(type => Comment, {
    nullable: true
  })
  targetComment: number; // other comment if reply other comment

  @Column()
  createdAt: Date;

  async reply({ content, user }) {
    const comment = Comment.create({
      content: content,
      user: user,
      commentableType: this.commentableType,
      commentableId: this.commentableId,
      targetComment: this.id,
      createdAt: new Date()
    });

    await comment.save();

    return comment;
  }
}
