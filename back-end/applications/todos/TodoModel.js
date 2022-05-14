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
    Pending: 1,
    Runnning: 2,
    Completed: 3,
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

  updateStatus = (status) => {

    return new Promise((resolve, reject) => {

    })
  }

  static load = (taskId) => {
    return new Promise((resolve, reject) => {
      let connection = mysqlConnection.connect()
    })
  }

  static search = (inputQuery) => {
    let params = Object.assign({}, {
      text: undefined,
      status: undefined,
      priority: undefined,
      dueDate: undefined,
      userId: undefined,
    }, inputQuery)
    return new Promise((resolve, reject) => {

    })
  }
}
