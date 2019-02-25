const server = require('../index');

const request = require('supertest');

afterEach(() => {
  server.close();
});

test('some', async(done) => {
  const res = await request(server).get('/test');
  expect(res.status).toEqual(200);

  done()
});