const SqlStr = require('sqlstring')

let updateStatus = (input) => {
  let params = Object.assign({}, {
    todoId: undefined,
    status: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.status, params.completed, params.todoId]
    var query = SqlStr.format(`UPDATE TodoList SET status = ?, completed = ? WHERE id = ?`, queryParams)

    params?.connection?.query(query, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

let update = (input) => {

}

let get = (input) => {
  let params = Object.assign({}, {
    taskId: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.username]
    var query = SqlStr.format(`SELECT * FROM TodoList WHERE username = ?`, queryParams)

    params?.connection?.query(query, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}
