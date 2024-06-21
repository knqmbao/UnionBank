const express = require('express')
const router = express.Router()

const AccountController = require('../controllers/Account.controller')
const AccountMiddleware = require('../middleware/Account.middleware')

router.post('/createaccount',
    AccountMiddleware.CreateAccountCheckEmptyFields,
    AccountMiddleware.CreateAccountCheckEmptyFields,
    AccountController.CreateAccount
)

router.get('/accounts',
    AccountMiddleware.CheckDeveloperTokenValid,
    AccountController.GetAllAccount
)

router.get('/accounts/:accountid',
    AccountMiddleware.CheckDeveloperTokenValid,
    AccountController.SearchAccount
)

router.post('/updateaccount',
    AccountMiddleware.CheckDeveloperTokenValid,
    AccountMiddleware.UpdateAccountCheckEmptyFields,
    AccountController.UpdateAccount
)

router.post('/updateactiveaccount',
    AccountMiddleware.CheckDeveloperTokenValid,
    AccountController.UpdateActiveAccount
)

module.exports = router