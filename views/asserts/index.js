const clientId = 'ee47ccff1c7db7bd97ac'
const clientSecret = '593cef4e50baa1423ba409a937f68989465fc4f0'
const redirectUrl = 'http://localhost:3000/public/login/github/callback'

const code = '2ffd47e9e555e8fa138b'
const url = 'https://github.com/login/oauth/access_token'
const proxy = 'https://cors-anywhere.herokuapp.com/'

let a = `${url}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`

// fetch(proxy + a, {
//   method: 'post',
//   headers: {
//     'Accept': 'application/json',
//   },
// }).then(res => console.log(res))



axios({
  method: 'post',
  url: proxy + a,
  header: {
    'Accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  }
}).then(res => console.log(res))