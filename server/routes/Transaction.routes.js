const express = require('express')
const router = express.Router()

const TransactionController = require('../controllers/Transaction.controller')
const TransactionMiddleware = require('../middleware/Transaction.middleware')

router.post('/deposittransaction',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    TransactionController.DepositTransaction
)

router.post('/withdrawtransaction',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    TransactionController.WithdrawTransaction
)

router.post('/transfertransaction',
    TransactionMiddleware.CheckUserTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    TransactionController.TransferTransaction
)

router.get('/transactions',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionController.GetAllTransaction
)

router.get('/transactions/:userId',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionController.GetAllUserTransaction
)

router.get('/searchtransactions/:searchId',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionController.SearchTransaction
)


module.exports = router