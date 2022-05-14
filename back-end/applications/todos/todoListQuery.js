const SqlStr = require('sqlstring')

const TABLE = 'TodoList'

let updateStatus = (input) => {
  let params = Object.assign({}, {
    todoId: undefined,
    status: undefined,
    connection: undefined,
    completed: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.status, params.completed, params.todoId]
    var query = SqlStr.format(`UPDATE ${TABLE} SET status = ?, completed = ? WHERE id = ?`, queryParams)

    params?.connection?.query(query, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

let update = (input) => {
  let params = Object.assign({}, {
    id: undefined,
    text: undefined,
    userId: undefined,
    description: undefined,
    completed: undefined,
    dueDate: undefined,
    startDate: undefined,
    priority: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.password, params.displayName, params.userId]
    var query = SqlStr.format(`UPDATE ${TABLE} SET password = ?, displayName = ? WHERE id = ?`, queryParams)

    params?.connection?.query(query, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

let get = (input) => {
  let params = Object.assign({}, {
    taskId: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.username]
    var query = SqlStr.format(`SELECT * FROM ${TABLE} WHERE username = ?`, queryParams)

    params?.connection?.query(query, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

let create = (input) => {
  let params = Object.assign({}, {
    text: undefined,
    userId: undefined,
    description: undefined,
    completed: undefined,
    dueDate: undefined,
    startDate: undefined,
    priority: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.text, params.userId, params.description, params.completed, params.dueDate, params.startDate, params.createdDate, params.priority, params.status]
    var query = ` INSERT INTO ${TABLE} (text, userId, description, completed, dueDate, startDate, createdDate, priority, status) ` +
      SqlStr.format(` values (text, userId, description, completed, dueDate, startDate, createdDate, priority, status) `, queryParams)
    params?.connection?.query(query, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

// public exports
exports.updateStatus = updateStatus
exports.update = update
exports.get = get
exports.create = create
