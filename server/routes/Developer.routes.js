const express = require('express')
const router = express.Router()

const DeveloperController = require('../controllers/Developer.controller')
const DeveloperMiddleware = require('../middleware/Developer.middleware')
const TransactionMiddleware = require('../middleware/Transaction.middleware')
const UserMiddleware = require('../middleware/User.middleware')

router.post('/createdevelopertoken/:userId',
    DeveloperMiddleware.CheckAdminTokenValid,
    DeveloperMiddleware.CreateDeveloperTokenCheckTokenIfExist,
    DeveloperMiddleware.CreateDeveloperTokenHashed,
    DeveloperController.CreateDeveloperToken
)

router.get('/unionbank/account/:accountno',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.GetRequestAccountNo
)

router.post('/unionbank/transfertransaction',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CheckAccountIfExist,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.TransferTransaction
)

router.get('/tokens/:userId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GetUserTokens
)

router.post('/deletetoken/:developerId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.DeleteToken
)

router.get('/it/auditlog',
    UserMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GetAllAuditLog
)

router.get('/it/backup',
    UserMiddleware.CheckDeveloperTokenValid,
    DeveloperController.BackUp
)

router.get('/it/restore',
    UserMiddleware.CheckDeveloperTokenValid,
    DeveloperController.Restore
)

module.exports = router