const request = require('supertest')
const app = require('../index')



describe('some test', () =>{
  test('test 1', async() => {
    const res = await request(app.callback()).get('/test')
    expect(res.status).toEqual(200)

  })
})

