const request = require('supertest')
const app = require('../index')
const faker = require('faker')
const dayjs = require('dayjs')

describe('test AwesomeCommentController', () => {

  test('GET /awesome-comments', async() => {
    const response = await request(app.callback())
      .get('/awesome-comments')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('rowCount')
    expect(response.body).toHaveProperty('data')

  })

  test('GET /awesome-comments/:id', async() => {
    const response = await request(app.callback())
      .get('/awesome-comments/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('user_id')
  })

  test('POST /awesome-comments', async() => {
    const response = await request(app.callback())
      .post('/awesome-comments')
      .send({
        user_id: 1,
        content: faker.lorem.paragraph(),
        reference: faker.internet.url(),
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    expect(response.status).toBe(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.data).toHaveProperty('content')
  })

  test('PUT /awesome-comments/:id', async() => {
    const response = await request(app.callback())
      .put('/awesome-comments/1')
      .send({
        content: 'from test2',
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('content')
    expect(response.body.data).toHaveProperty('created_at')
  })

  test('DELETE /awesome-comments/:id', async() => {

    const firstCreate = async() => {
      return await request(app.callback())
        .post('/awesome-comments')
        .send({
          user_id: 1,
          content: 'created from test delete test',
          reference: faker.internet.url(),
          created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
    }

    const res = await firstCreate()

    const response = await request(app.callback()).delete('/awesome-comments/' + res.body.data.id)

    expect(response.status).toBe(200)
    expect(response.body.data).toEqual({})

  })
})

