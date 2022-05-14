const jwt = require("jsonwebtoken")
const mysqlConnection = require('../mysql/connection')
const message = require('../utilities/message')
const todoListQuery = require('./todoListQuery')

let create = (input) => {
  let params = Object.assign({}, {
    text: undefined,
    userId: undefined,
    description: undefined,
    completed: undefined,
    dueDate: undefined,
    createdDate: undefined,
    startDate: undefined,
    priority: undefined,
    status: undefined,
  }, input)
  return new Promise(async (resolve, reject) => {
    let connection = mysqlConnection.connect()
    params.connection = connection
    let result = {success: true}
    // create new task for user
    try {
      connection?.beginTransaction()
      await todoListQuery.createUser(params)
      connection?.commit()
    } catch (error) {
      result.success = false
      result.message = message.cannotCreateData
    }
    connection?.end()
    resolve(result)
  })
}

let update = (input) => {
  let params = Object.assign({}, {
    id: undefined,
    text: undefined,
    description: undefined,
    description: undefined,
    description: undefined,
    description: undefined,
    description: undefined,
  }, input)
  return new Promise(async (resolve, reject) => {
    let connection = mysqlConnection.connect()
    params.connection = connection
    let result = {success: true}
    let users = []
    try {
      users = await userQuery.getUserByUsername({connection, username: params.username})
      console.log('update getUserByUsername: ', users)
      if (!(users?.length > 0)) {
        result.success = false
        result.message = message.userIsNotExists
      }
    } catch (error) {
      console.log('user update getUserByUsername error: ', error)
      result.success = false
      result.message = message.cannotQuery
    }
    // create new account for user
    if (users?.length > 0 && result.success) {
      try {
        params.userId = users[0].id
        connection?.beginTransaction()
        await userQuery.updateUser(params)
        connection?.commit()
      } catch (error) {
        console.log('user update updateUser error: ', error)
        result.success = false
        result.message = message.cannotUpdateUser
      }
    }
    connection?.end()
    resolve(result)
  })
}

// public exports
exports.regist = regist
exports.update = update
