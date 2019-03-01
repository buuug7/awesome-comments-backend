const request = require('supertest')
const app = require('../index')

describe('test authentication', () => {

  test('POST /public/login = with correct password', async() => {
    const response = await request(app.callback())
      .post('/public/login')
      .send({
        email: 'youpp@126.com',
        password: '111111',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  test('POST /public/login = with wrong password', async() => {
    const response = await request(app.callback())
      .post('/public/login')
      .send({
        email: 'youpp@126.com',
        password: 'wrongPassword',
      })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Authentication Error')
  })

  test('POST /public/login = with wrong email and password', async() => {
    const response = await request(app.callback())
      .post('/public/login')
      .send({
        email: 'notExistsEmail@google.com',
        password: 'anything'
      })

    expect(response.status).toBe(401)
    expect(response.body.message).toMatch(/Not exists .+/i)
  })
})