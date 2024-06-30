const express = require('express')
const router = express.Router()

const DeveloperController = require('../controllers/Developer.controller')
const DeveloperMiddleware = require('../middleware/Developer.middleware')
const TransactionMiddleware = require('../middleware/Transaction.middleware')

router.post('/createdevelopertoken/:userId',
    DeveloperMiddleware.CheckAdminTokenValid,
    DeveloperMiddleware.CreateDeveloperTokenCheckTokenIfExist,
    DeveloperMiddleware.CreateDeveloperTokenHashed,
    DeveloperController.CreateDeveloperToken
)

router.post('/developer/deposittransaction',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.DepositTransaction
)

router.post('/developer/withdrawtransaction',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.WithdrawTransaction
)

router.post('/developer/transfertransaction',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.TransferTransaction
)

router.get('/tokens',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GetAllTokens
)

router.post('/deletetoken/:developerId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.DeleteToken
)

module.exports = router