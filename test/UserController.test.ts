import request from 'supertest';
import app from '../src/app';
import * as faker from 'faker';
import {databaseConnect} from '../src/common/database';

describe('test UserController', () => {
  let token;

  beforeAll(async () => {
    await databaseConnect();
    const response = await request(app.callback())
      .post('/public/auth')
      .send({
        email: 'youpp@126.com',
        password: '111111'
      });

    token = response.body.token;
  });

  it('GET /users/11/starSoups', async () => {
    const response = await request(app.callback())
      .get('/users/11/starSoups')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('total');
  });

  it('GET /users/11/starComments', async () => {
    const response = await request(app.callback())
      .get('/users/11/starComments')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('total');
  })
});
