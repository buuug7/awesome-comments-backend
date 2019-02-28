const request = require('supertest')
const app = require('../index')
const faker = require('faker')
const dayjs = require('dayjs')

describe('test AwesomeCommentController', () => {
  let token

  beforeAll(async() => {
    const response = await request(app.callback())
      .post('/public/login')
      .send({
        email: 'youpp@126.com',
        password: '111111',
      })
    token = response.body.token
  })

  test('GET /awesome-comments', async() => {

    console.log(token)
    const response = await request(app.callback())
      .get('/awesome-comments')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('rowCount')
    expect(response.body).toHaveProperty('data')
  })

  test('GET /awesome-comments/:id', async() => {
    const response = await request(app.callback())
      .get('/awesome-comments/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('user_id')
  })

  test('POST /awesome-comments', async() => {
    const response = await request(app.callback())
      .post('/awesome-comments')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: 1,
          content: 'created from test delete test',
          reference: faker.internet.url(),
          created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
    }

    const res = await firstCreate()
    const response = await request(app.callback())
      .delete('/awesome-comments/' + res.body.data.id)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toEqual({})

  })

  test('POST /awesome-comments/:id/star', async() => {
    const response = await request(app.callback())
      .post('/awesome-comments/1/star')
      .set('Authorization', `Bearer ${token}`)

    console.log(JSON.stringify(response.body))

    expect(response.status).toBe(200)
  })
})

