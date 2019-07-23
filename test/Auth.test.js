const request = require('supertest');
const app = require('../src/index');

describe('test authentication', () => {

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500))
  })

  test('POST /public/auth = with correct password', async () => {
    const response = await request(app.callback())
      .post('/public/auth')
      .send({
        email: 'master@dev.com',
        password: 'master'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /public/auth = with wrong password', async () => {
    const response = await request(app.callback())
      .post('/public/auth')
      .send({
        email: 'master@dev.com',
        password: 'wrongPassword'
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication Error');
  });

  test('POST /public/auth = with wrong email and password', async () => {
    const response = await request(app.callback())
      .post('/public/auth')
      .send({
        email: 'notExistsEmail@google.com',
        password: 'anything'
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Not exists .+/i);
  });
});
