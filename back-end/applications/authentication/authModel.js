const jwt = require("jsonwebtoken")
const mysqlConnection = require('../mysql/connection')

let generateAccessToken = (input) => {
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
  return jwt.sign(info, "mySecretKey", {expiresIn: "1h"  })
}

let generateRefreshToken = (input) => {
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

let login = (input) => {
  let params = Object.assign({}, {
    username: undefined,
    password: undefined,
  }, input)
  return new Promise(async (resolve, reject) => {
    let user = await checkUsernamePassword({username: params.username, password: params.password})
    if (user) {
      //Generate an access token
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      // save refresh token for loged in user
      let saveRefreshTokenRes = await saveRefreshToken({
        userId: user.id,
        refreshToken
      })

      resolve({
        success: true,
        accessToken,
        refreshToken,
      })
    } else {
      resolve({success: false, message: 'Incorrect username or password'})
    }
  })
}

// public exports
exports.login = login
