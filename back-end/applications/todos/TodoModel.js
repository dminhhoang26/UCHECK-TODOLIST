const todoListQuery = require('./todoListQuery')
const mysqlConnection = require('../mysql/connection')

class TodoModel {
  text
  completed
  id
  userId
  description
  priority
  status
  dueDate
  startDate
  createdDate

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
      this.completed = data.completed
      this.id = data.id
      this.userId = data.userId
      this.description = data.description
      this.priority = data.priority
      this.status = data.status
      this.dueDate = data.dueDate
      this.startDate = data.startDate
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
        console.log(`${TABLE} create updateStatus: `, error)
      }
      if (hasError) {
        connection?.rollback()
      }
      connection?.end()
      hasError && resolve(false)
      resolve(true)
    })
  }

  static load = (input) => {
    let params = Object.assign({}, {
      taskId: undefined,
      userId: undefined,
    }, input)
    return new Promise((resolve, reject) => {
      let connection = mysqlConnection.connect()

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
      createdTime: undefined,
      focus: undefined,
    }, input)
    return new Promise((resolve, reject) => {
      let hasError = false
      let connection = mysqlConnection.connect()
      params.connection = connection
      params.status = params.completed == true ? TodoModel.TASK_STATUS.Completed : TodoModel.TASK_STATUS.New
      try {
        connection?.beginTransaction()
        todoListQuery.create(params)
        connection?.commit()
      } catch (error) {
        hasError = true
        console.log(`${TABLE} create error: `, error)
      }
      if (hasError) {
        connection?.rollback()
      }
      connection?.end()
      hasError && resolve(false)
      resolve(true)
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
        console.log(`${TABLE} search error: `, error)
      }
      connection?.end()
      resolve(results)
    })
  }
}
