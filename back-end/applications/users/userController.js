const userModel = require('./userModel')

exports.regist = (req, res) => {
  let input = {
    password: req?.body?.password,
    username: req?.body?.username,
  }
  userModel.regist(input).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json({success: false, error: err})
  })
}

exports.update = (req, res) => {
  let input = {
    password: req?.body?.password,
    displayName: req?.body?.displayName
  }
  userModel.update(input).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json({success: false, error: err})
  })
}
