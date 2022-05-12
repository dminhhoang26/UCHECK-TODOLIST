

exports.create = (req, res) => {
  let inputData = req.body
  res.json({success: true})
}

exports.search = (req, res) => {
  let inputCondition = req.body
  res.json([
    {id: 1, name: 'task 1', description: 'this is description', status: 1, createDate: '', dueDate: ''},
    {id: 2, name: 'task 2', description: 'this is description', status: 1, createDate: '', dueDate: ''},
    {id: 3, name: 'task 3', description: 'this is description', status: 1, createDate: '', dueDate: ''},
  ])
}

exports.myTask = (req, res) => {
  res.json([
    {id: 1, name: 'task 1', description: 'this is description', status: 1, createDate: '', dueDate: ''},
    {id: 2, name: 'task 2', description: 'this is description', status: 1, createDate: '', dueDate: ''},
    {id: 3, name: 'task 3', description: 'this is description', status: 1, createDate: '', dueDate: ''},
  ])
}

exports.update = (req, res) => {
  let inputCondition = req.body
  res.json({success: true})
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
