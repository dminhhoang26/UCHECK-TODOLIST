const todoListQuery = require('./todoListQuery')
const mysqlConnection = require('../mysql/connection')
const { Logger} = require('../utilities/Logger')
const logger = new Logger()

class TodoModel {
  text
  complete
  id
  userId
  remarks
  startTime
  endTime
  createdDate
  focus

  static TASK_STATUS = {
    Pending: 'Pending',
    Runnning: 'Runnning',
    Completed: 'Completed',
    New: 'New',
  }

  static TASK_PRIORITY = {
    Low: 1,
    Normal: 2,
    High: 3,
    Immediately: 4
  }

  constructor(data) {
    if (data) {
      this.text = data.text
      this.complete = data.complete
      this.id = data.id
      this.userId = data.userId
      this.remarks = data.remarks
      this.startTime = data.startTime
      this.endTime = data.endTime
      this.focus = data.focus
      this.createdDate = data.createdDate
    }
  }

  updateFocusStatus = (focus) => {
    return new Promise((resolve, reject) => {
      let connection =  mysqlConnection.connect()
      let hasError = false
      try {
        connection?.beginTransaction()
        todoListQuery.updateFocusStatus({
          taskId: this.id,
          status: focus == true ? true : false,
          connection: connection,
        })
        connection?.commit()
      } catch (error) {
        hasError = true
        console.log(`updateFocusStatus: `, error)
      }
      if (hasError) {
        connection?.rollback()
      }
      connection?.end()
      hasError && resolve(false)
      resolve(true)
    })
  }

  static update = (input) => {
    let params = Object.assign({}, {
      text: undefined,
      userId: undefined,
      remarks: undefined,
      complete: undefined,
      startTime: undefined,
      endTime: undefined,
      createdDate: undefined,
      focus: undefined,
    }, input)
    return new Promise(async (resolve, reject) => {
      let hasError = false
      let connection = mysqlConnection.connect()
      params.connection = connection
      let updateResult = null
      try {
        connection?.beginTransaction()
        updateResult = await todoListQuery.update(params)
        logger.log(updateResult)
        connection?.commit()
      } catch (error) {
        hasError = true
        console.log(`create error: `, error)
      }
      if (hasError) {
        connection?.rollback()
      }
      connection?.end()
      resolve(updateResult)
    })
  }

  static load = (input) => {
    let params = Object.assign({}, {
      taskId: undefined,
      userId: undefined,
    }, input)
    return new Promise(async (resolve, reject) => {
      let connection = mysqlConnection.connect()
      params.connection = connection
      let todo = null
      try {
        let queryResults = await todoListQuery.get(params)
        if (queryResults?.length > 0) {
          todo = new TodoModel(queryResults[0])
        }
      } catch (error) {
        connection?.end()
        reject(error)
      }
      connection?.end()
      resolve(todo)
    })
  }

  static create = (input) => {
    let params = Object.assign({}, {
      text: undefined,
      userId: undefined,
      remarks: undefined,
      complete: undefined,
      startTime: undefined,
      endTime: undefined,
      createdDate: undefined,
      focus: undefined,
    }, input)
    return new Promise(async (resolve, reject) => {
      let hasError = false
      let connection = mysqlConnection.connect()
      params.connection = connection
      let insertId = null
      try {
        connection?.beginTransaction()
        let createResult = await todoListQuery.create(params)
        insertId = createResult?.insertId
        connection?.commit()
      } catch (error) {
        hasError = true
        console.log(`create error: `, error)
      }
      if (hasError) {
        connection?.rollback()
      }
      connection?.end()
      resolve(insertId)
    })
  }

  static search = (inputQuery) => {
    let params = Object.assign({}, {
      createdDate: undefined,
      userId: undefined,
    }, inputQuery)
    return new Promise(async (resolve, reject) => {
      let connection = mysqlConnection.connect()
      params.connection = connection
      let results = []
      try {
        results = await todoListQuery.search(params)
      } catch (error) {
        console.log(`search error: `, error)
      }
      connection?.end()
      resolve(results)
    })
  }
}

exports.TodoModel = TodoModel
