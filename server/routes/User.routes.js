const express = require('express')
const router = express.Router()

const UserController = require('../controllers/User.controller')
const UserMiddleware = require('../middleware/User.middleware')

router.post('/createuser',
    UserMiddleware.CreateUserCheckEmptyFields,
    UserMiddleware.CreateUserCheckUserIfExists,
    UserMiddleware.CreateUserHashedPassword,
    UserController.CreateUser
)

router.get('/users',
    UserMiddleware.CheckUserTokenValid,
    UserController.GetAllUsers
)

router.get('/users/:userId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.SearchUser
)

router.post('/updateuser/:userId',
    UserMiddleware.CheckUserTokenValid,
    UserMiddleware.UpdateUserCheckEmptyFields,
    UserController.UpdateUser
)

router.post('/updateactiveuser/:userId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.UpdateActiveUser
)

module.exports = router