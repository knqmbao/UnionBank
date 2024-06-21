const express = require('express')
const router = express.Router()

const UserController = require('../controllers/User.controller')
const UserMiddleware = require('../middleware/User.middleware')

router.post('/createuser',
    UserMiddleware.CreateUserCheckEmptyFields,
    UserMiddleware.CreateUserCheckUserIfExists,
    UserController.CreateUser
)

router.get('/users',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.GetAllUsers
)

router.get('/users/:userid',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.SearchUser
)

router.post('/updateuser',
    UserMiddleware.CheckDeveloperTokenValid,
    UserMiddleware.UpdateUserCheckEmptyFields,
    UserController.UpdateUser
)

router.post('/updateactiveuser',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.UpdateActiveUser
)

module.exports = router