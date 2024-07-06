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

router.get('/employedusers',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.GetAllEmployedUsers
)

router.get('/users/:userId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.GetCurrentUser
)

router.get('/rbusers',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.GetAllRBUsers
)

router.get('/rbaccounts',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.GetAllRBAccounts
)

router.get('/searchremployedusers/:searchId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.SearchEmployedUsers
)

router.get('/searchrbusers/:searchId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.SearchRBUser
)

router.get('/searchrbaccounts/:searchId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.SearchRBAccounts
)

router.post('/updateuser/:userId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserMiddleware.UpdateUserCheckEmptyFields,
    UserController.UpdateUser
)

router.post('/updateactiveuser/:userId',
    UserMiddleware.CheckDeveloperTokenValid,
    UserController.UpdateActiveUser
)

module.exports = router