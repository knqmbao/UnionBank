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

// router.post('/developer/deposittransaction',
//     DeveloperMiddleware.CheckDeveloperTokenValid,
//     TransactionMiddleware.CreateTransactionCheckEmptyFields,
//     DeveloperController.DepositTransaction
// )

// router.post('/developer/withdrawtransaction',
//     DeveloperMiddleware.CheckDeveloperTokenValid,
//     TransactionMiddleware.CreateTransactionCheckEmptyFields,
//     DeveloperController.WithdrawTransaction
// )

router.get('/unionbank/account/:accountno',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.GetRequestAccountNo
)

router.post('/unionbank/transfertransaction',
    DeveloperMiddleware.CheckDeveloperTokenValid,
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

module.exports = router