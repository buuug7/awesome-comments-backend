import request from 'supertest';
import app from '../src/app';
import { databaseConnect } from '../src/common/database';

const apiPrefix = '/api/v1';

describe('test authentication', () => {
  beforeAll(async () => {
    await databaseConnect();
  });

  test('POST /public/auth = with correct password', async () => {
    const response = await request(app.callback())
      .post(`${apiPrefix}/public/auth`)
      .send({
        email: 'youpp@126.com',
        password: '111111'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /public/auth = with wrong password', async () => {
    const response = await request(app.callback())
      .post(`${apiPrefix}/public/auth`)
      .send({
        email: 'youpp@126.com',
        password: '2222'
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  test('POST /public/auth = with wrong email and password', async () => {
    const response = await request(app.callback())
      .post(`${apiPrefix}/public/auth`)
      .send({
        email: 'notExistsEmail@google.com',
        password: 'anything'
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Not exists .+/i);
  });
});
