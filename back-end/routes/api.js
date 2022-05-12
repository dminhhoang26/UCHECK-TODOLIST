let express = require('express')
let router = express.Router()
let authController = require('../applications/authentication/authController')
let userController = require('../applications/users/userController')
let todoListController = require('../applications/todos/todoListController')

router.post('/auth/login', authController.login)
router.get('/auth/test', authController.testApi)

router.post('/user/regist', userController.regist)
router.post('/user/update', userController.update)

router.get('/task/get', todoListController.get)
router.post('/task/create', todoListController.create)
router.post('/task/search', todoListController.search)
router.post('/task/update', todoListController.update)
router.post('/task/delete', todoListController.delete)

module.exports = router;
