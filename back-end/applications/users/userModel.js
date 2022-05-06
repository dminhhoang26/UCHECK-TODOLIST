const jwt = require("jsonwebtoken")
const mysqlConnection = require('../mysql/connection')

let regist = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
    displayName: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    var query = `
    SELECT * FROM users user
    WHERE user.username = '${params.username}'
    `
    let connection = mysqlConnection.connect()
    connection?.query(query, (err, user) => {
      if (err) {
        console.log(err)
        resolve(null)
      }

    })
    connection?.end()
  })
}

let update = (input) => {
  let params = Object.assign({}, {
    userId: undefined,
    username: undefined,
    password: undefined,
    displayName: undefined,
  }, input)
  let info = {
    id: params.userId,
    username: params.username,
    displayName: params.displayName,
  }
  return jwt.sign(info, "myRefreshSecretKey")
}

let checkUsernamePassword = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let query = `
    SELECT * FROM users user
    WHERE user.username = '${params.username}'
      AND user.password = '${params.password}'
    `
    let connection = mysqlConnection.connect()
    connection?.query(query, (err, user) => {
      if (err) {
        console.log(err)
        resolve(null)
      }
      resolve(user)
    })
    connection?.end()
  })
}

let saveRefreshToken = (input) => {
  let params = Object.assign({}, {
    refreshToken: undefined,
    userId: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let insertQuery = `
      INSERT INTO RefeshTokens (userId, refreshToken)
      VALUES ('${params.userId}', '${params.refreshToken}')
    `
    connection = mysqlConnection.connect()
    connection?.beginTransaction()
    connection?.query(insertQuery, (err, res) => {
      if (err) {
        console.log(err)
        resolve(false)
      }
      console.log(res)
      resolve(true)
    })
    connection?.commit()
    connection?.end()
  })
}

// public exports
exports.regist = regist
exports.update = update
