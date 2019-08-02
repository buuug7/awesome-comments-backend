import { databaseConnect } from '../src/common/database';
import request from 'supertest';
import app from '../src/app';

describe('Test CommentController', () => {
  let token;
  let createdComment;

  beforeAll(async () => {
    await databaseConnect();

    const response = await request(app.callback())
      .post('/public/auth')
      .send({
        email: 'youpp@126.com',
        password: '111111'
      });

    token = response.body.token;

    const firstCreate = async () => {
      return request(app.callback())
        .post('/soups/1/comment')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'create from test case'
        });
    };

    createdComment = (await firstCreate()).body;
  });

  test('GET /comments/1', async () => {
    const response = await request(app.callback())
      .get('/comments/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  test('GET /comments/1/reply', async () => {
    const response = await request(app.callback())
      .post('/comments/1/reply')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'some reply message of more and more ...'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('targetComment');
  });

  test('POST /soups/1/comment', async () => {
    const response = await request(app.callback())
      .post('/soups/1/comment')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'create from test case'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  test('GET /comments/1/star', async () => {
    const response = await request(app.callback())
      .post(`/comments/${createdComment.id}/star`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.count).toEqual(1);
  });

  test('GET /comments/1/unStar', async () => {
    const response = await request(app.callback())
      .post(`/comments/${createdComment.id}/unStar`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.count).toEqual(0);
  });

  test('GET /comments/1/starCount', async () => {
    const response = await request(app.callback())
      .get(`/comments/1/starCount`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('count');
  });


  test('GET /comments/1/starUsers', async () => {
    const response = await request(app.callback())
      .get(`/comments/1/starUsers`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('total');
  });
});
