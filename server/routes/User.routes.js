const express = require('express')
const router = express.Router()

const UserController = require('../controllers/User.controller')
const UserMiddleware = require('../middleware/User.middleware')

router.post('/loginuser',
    UserMiddleware.CheckDeveloperTokenValid,
    UserMiddleware.LoginUserCheckEmptyFields,
    UserMiddleware.LoginUserCheckEmail,
    UserMiddleware.LoginUserCheckPassword
)

router.post('/createuser',
    UserMiddleware.CheckDeveloperTokenValid,
    UserMiddleware.CreateUserCheckEmptyFields,
    UserMiddleware.CreateUserCheckUserIfExists,
    UserMiddleware.CreateUserHashedPassword,
    UserController.CreateUser
)

router.get('/users',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.GetAllUsers
)

router.get('/users/:name', //temp
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.SearchUser
)

router.post('/updateuser/:userId', //temp
    UserMiddleware.CheckUserTokenValid,
    UserMiddleware.UpdateUserCheckEmptyFields,
    UserController.UpdateUser
)

router.post('/updateactiveuser/:userId', //temp
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.UpdateActiveUser
)

module.exports = router