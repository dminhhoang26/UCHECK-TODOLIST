const SqlStr = require('sqlstring')
const { Logger} = require('../utilities/Logger')
const logger = new Logger()

const TABLE = 'TodoList'

let updateFocusStatus = (input) => {
  let params = Object.assign({}, {
    todoId: undefined,
    focus: undefined,
    connection: undefined,
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
    remarks: undefined,
    complete: undefined,
    startTime: undefined,
    endTime: undefined,
    focus: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    var query = SqlStr.format(`UPDATE ${TABLE} SET text = ?, remarks = ?, complete = ? `, [params.text, params.remarks, params.complete])
      + SqlStr.format(` ,startTime = ?, endTime = ?, focus = ? `, [params.startTime, params.endTime, params.focus])
      + SqlStr.format(` WHERE id = ? `, [params.id])
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
    let queryParams = [params.taskId]
    var query = SqlStr.format(`SELECT * FROM ${TABLE} WHERE id = ?`, queryParams)

    params?.connection?.query(query, (err, datas) => {
      if (err) {
        reject(err)
      }
      resolve(datas)
    })
  })
}

let create = (input) => {
  let params = Object.assign({}, {
    text: undefined,
    userId: undefined,
    remarks: undefined,
    complete: undefined,
    startTime: undefined,
    endTime: undefined,
    createdDate: undefined,
    focus: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.text, params.userId, params.remarks, params.complete, params.startTime, params.endTime, params.createdDate, params.focus]
    var query = ` INSERT INTO ${TABLE} (text, userId, remarks, complete, startTime, endTime, createdDate, focus) ` +
      SqlStr.format(` values (?, ?, ?, ?, ?, ?, ?, ?) `, queryParams)
    params?.connection?.query(query, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

let search = (input) => {
  let params = Object.assign({},{
    userId: undefined,
    createdDate: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.userId, params.createdDate]
    var query = SqlStr.format(`SELECT * FROM ${TABLE} WHERE userId = ? AND createdDate = ?`, queryParams)

    params?.connection?.query(query, (err, datas) => {
      if (err) {
        reject(err)
      }
      resolve(datas)
    })
  })
}

let clearFocusOfTheDay = (input) => {
  let params = Object.assign({}, {
    userId: undefined,
    createdDate: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    var query = SqlStr.format(`UPDATE ${TABLE} SET focus = ? `, [params.focus])
      + SqlStr.format(` WHERE createdDate = ? AND userId = ? `, [params.createdDate, params.userId])
      params?.connection?.query(query, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

let getStreak = (input) => {
  let params = Object.assign({},{
    userId: undefined,
    createdDates: undefined,
    connection: undefined,
  }, input)
  return new Promise((resolve, reject) => {
    let queryParams = [params.userId, ...params.createdDates]
    logger.log(queryParams)
    var query = SqlStr.format(`SELECT * FROM ${TABLE} WHERE userId = ? AND createdDate IN (?,?,?,?,?) `, queryParams)

    params?.connection?.query(query, (err, datas) => {
      if (err) {
        reject(err)
      }
      resolve(datas)
    })
  })
}


// public exports
exports.updateFocusStatus = updateFocusStatus
exports.update = update
exports.get = get
exports.create = create
exports.search = search
exports.clearFocusOfTheDay = clearFocusOfTheDay
