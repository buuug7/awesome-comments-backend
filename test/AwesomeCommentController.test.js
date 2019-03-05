const request = require('supertest');
const app = require('../index');
const faker = require('faker');
const dayjs = require('dayjs');

describe('test AwesomeCommentController', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app.callback())
      .post('/public/login')
      .send({
        email: 'master@dev.com',
        password: '111111'
      });
    token = response.body.token;
  });

  test('GET /awesome-comments', async () => {
    const response = await request(app.callback())
      .get('/awesome-comments')
      .set('Authorization', `Bearer ${token}`);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('nextPageUrl');
  });

  test('GET /awesome-comments/:id', async () => {
    const response = await request(app.callback())
      .get('/awesome-comments/1')
      .set('Authorization', `Bearer ${token}`);

    console.log(JSON.stringify(response.body));

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('UserId');
  });

  test('POST /awesome-comments', async () => {
    const response = await request(app.callback())
      .post('/awesome-comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        UserId: 1,
        content: faker.lorem.paragraph(),
        reference: faker.internet.url()
      });
    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toHaveProperty('content');
  });

  test('PUT /awesome-comments/:id', async () => {
    const response = await request(app.callback())
      .put('/awesome-comments/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'from test2'
      });

    console.log(JSON.stringify(response.body));

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toBeGreaterThan(0);
  });

  test('DELETE /awesome-comments/:id', async () => {
    const firstCreate = async () => {
      return await request(app.callback())
        .post('/awesome-comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          UserId: 1,
          content: 'created from test delete test',
          reference: faker.internet.url()
        });
    };

    const res = await firstCreate();

    console.log(res.body);

    const response = await request(app.callback())
      .delete('/awesome-comments/' + res.body.data.id)
      .set('Authorization', `Bearer ${token}`);

    console.log(JSON.stringify(response.body));

    expect(response.status).toBe(200);
    expect(response.body.data).toBe(1);
  });

  test('POST /awesome-comments/:id/unstar', async () => {
    const response = await request(app.callback())
      .post('/awesome-comments/1/unstar')
      .set('Authorization', `Bearer ${token}`);
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    // expect(response.body.data).toHaveProperty('count')
  });

  test('POST /awesome-comments/:id/star', async () => {
    const response = await request(app.callback())
      .post('/awesome-comments/1/star')
      .set('Authorization', `Bearer ${token}`);

    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('count');
  });

  test('GET /awesome-comments/:id/starcount', async () => {
    const response = await request(app.callback())
      .get('/awesome-comments/1/starcount')
      .set('Authorization', `Bearer ${token}`);
    console.log(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('count');
  });
});
