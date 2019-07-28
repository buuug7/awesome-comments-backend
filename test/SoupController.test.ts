import request from 'supertest';
import app from '../src/app';
import * as faker from 'faker';
import dayjs from 'dayjs';
import connection from '../src/common/database';

describe('test SoupController', () => {
  let token;

  beforeAll(async () => {
    await connection;
    const response = await request(app.callback())
      .post('/public/auth')
      .send({
        email: 'youpp@126.com',
        password: '111111'
      });
    token = response.body.token;
  });

  test('GET /soups', async () => {
    const response = await request(app.callback())
      .get('/soups')
      .set('Authorization', `Bearer ${token}`);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('nextPageUrl');
  });

  test('GET /soups/:id', async () => {
    const response = await request(app.callback())
      .get('/soups/1')
      .set('Authorization', `Bearer ${token}`);

    console.log(JSON.stringify(response.body));

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
  });

  test('POST /soups', async () => {
    const response = await request(app.callback())
      .post('/soups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: faker.lorem.paragraph()
      });
    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('content');
  });

  test('PUT /soups/:id', async () => {
    const response = await request(app.callback())
      .put('/soups/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'from test2'
      });

    console.log(JSON.stringify(response.body));

    expect(response.status).toBe(200);
  });

  test('DELETE /soups/:id', async () => {
    const firstCreate = async () => {
      return  request(app.callback())
        .post('/soups')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'created from test delete test'
        });
    };

    const res = await firstCreate();

    console.log(res.body);

    const response = await request(app.callback())
      // @ts-ignore
      .delete('/soups/' + res.body.id)
      .set('Authorization', `Bearer ${token}`);

    console.log(JSON.stringify(response.body));

    expect(response.status).toBe(200);
  });

  test('POST /soups/:id/unStar', async () => {
    const response = await request(app.callback())
      .post('/soups/1/unStar')
      .set('Authorization', `Bearer ${token}`);
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    // expect(response.body.data).toHaveProperty('count')
  });

  test('POST /soups/:id/star', async () => {
    const response = await request(app.callback())
      .post('/soups/1/star')
      .set('Authorization', `Bearer ${token}`);

    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('count');
  });

  test('GET /soups/:id/starCount', async () => {
    const response = await request(app.callback())
      .get('/soups/1/starCount')
      .set('Authorization', `Bearer ${token}`);
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('count');
  });
});
