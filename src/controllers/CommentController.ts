import { Comment } from '../entity/Comment';

export async function reply(ctx) {
  const content = ctx.request.body.content;
  const user = ctx.state.user;
  const comment = await Comment.findOneOrFail(ctx.params.id);
  ctx.body = await comment.reply({ content, user });
}

export async function show(ctx) {
  ctx.body = await Comment.findOneOrFail(ctx.params.id, {
    relations: ['targetComment', 'user']
  });
}
