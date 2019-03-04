const clientId = 'e35c0fb524d888487038'
const clientSecret = 'b5d2df1a91c6cca5a0ad73ffb6d565ce6096f221'
const redirectUrl = 'http://localhost:3000/public/login/github/callback'

const url = 'https://github.com/login/oauth/access_token'

fetch(url, {
  method: 'POST',
  headers: {
    'Content-type': 'multipart/form-data',
  },
  body: 'client_id=e35c0fb524d888487038&client_secret=b5d2df1a91c6cca5a0ad73ffb6d565ce6096f221&code=485aae806ba26c4943a6',
  mode: 'no-cors'
}).then(res => res.text())
  .then(r=> console.log(r))
