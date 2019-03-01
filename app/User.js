const Sequence = require('sequelize')
const db = require('../db')

const User = db.define('users', {
  name: {
    type: Sequence.STRING
  }
})

User.findAll().then(users => {
  console.log(users)
})