const { TodoModel } = require('./TodoModel')
const { Logger} = require('../utilities/Logger')
const logger = new Logger()

exports.create = (req, res) => {
  let inputData = req.body
  logger.log(req)
  TodoModel.create(inputData).then(async (results) => {
    if (results) {
      try {
        let todo = await TodoModel.load({taskId: results})
        return res.json(todo)
      } catch (error) {
        return res.status(500).json({success: false, message: error})
      }
    } else {
      return res.status(500).json({success: false, message: 'cannot create task'})
    }
  }).catch(error => {
    return res.status(500).json({success: false, message: error})
  })
}

exports.search = (req, res) => {
  let inputCondition = req.body
  TodoModel.search(inputCondition).then(datas => {
    res.json(datas)
  }).catch(error => {
    res.status(500).json({success: false, message: error})
  })
}

exports.update = async (req, res) => {
  let inputData = req.body
  let todo = null
  try {
    todo = await TodoModel.load({taskId: inputData.id})
  } catch (error) {
    return res.status(500).json({success: false, error: error})
  }
  if (todo) {
    if (todo.focus) {
      await TodoModel.clearFocusOfTheDay({
        userId: inputData.userId,
        createdDate: inputData.createdDate,
      })
    }
    TodoModel.update(inputData).then(async (results) => {
      if (results) {
        try {
          let todo = await TodoModel.load({taskId: inputData.id})
          return res.json(todo)
        } catch (error) {
          return res.status(500).json({success: false, message: error})
        }
      } else {
        return res.status(500).json({success: false, message: 'cannot update task'})
      }
    }).catch(error => {
      return res.status(500).json({success: false, message: error})
    })
  } else {
    return res.status(500).json({success: false, message: 'Task does not exists'})
  }
}

exports.delete = (req, res) => {
  let taskId = req.body?.id
  if (taskId) {
    res.json({success: true})
  } else {
    res.status(500).json({success: false})
  }
}

exports.get = (req, res) => {
  let taskId = req.query?.taskId
  if (taskId) {
    res.json({success: true})
  } else {
    res.status(500).json({success: false})
  }
}

exports.getStreak = (req, res) => {
  let userId = req?.query?.userId || 1
  TodoModel.getStreak({userId: userId}).then(datas => {
    res.json(datas)
  }).catch(error => {
    res.status(500).json({success: false, message: error})
  })
}
