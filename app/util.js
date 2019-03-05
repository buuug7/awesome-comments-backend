const jsonWebToken = require('jsonwebtoken');

/**
 * return JWT token
 * @param {{name:string,email:string,id:number}} user
 * @return {*}
 */
function signAuthToken(user) {
  return jsonWebToken.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
      name: user.name,
      email: user.email,
      id: user.id
    },
    process.env.APP_KEY
  );
}

/**
 * Random string
 * @return {string}
 */
function randomStr() {
  return Math.random()
    .toString(36)
    .substr(2);
}

module.exports = { signAuthToken, randomStr };
