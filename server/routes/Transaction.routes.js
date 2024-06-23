const express = require('express')
const router = express.Router()

const TransactionController = require('../controllers/Transaction.controller')
const TransactionMiddleware = require('../middleware/Transaction.middleware')

router.post('/deposittransaction',
    TransactionMiddleware.CheckUserTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    TransactionController.DepositTransaction
)

router.post('/withdrawtransaction',
    TransactionMiddleware.CheckUserTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    TransactionController.WithdrawTransaction
)

router.post('/transfertransaction',
    TransactionMiddleware.CheckUserTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    TransactionController.TransferTransaction
)

router.get('/transactions',
    TransactionMiddleware.CheckUserTokenValid,
    TransactionController.GetAllTransaction
)

router.get('/transactions/:accountId',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionController.SearchTransaction
)


module.exports = router