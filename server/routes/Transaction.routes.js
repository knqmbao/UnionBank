const express = require('express')
const router = express.Router()

const TransactionController = require('../controllers/Transaction.controller')
const TransactionMiddleware = require('../middleware/Transaction.middleware')

router.post('/createtransaction',
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    TransactionController.CreateTransaction
)

router.get('/transactions',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionController.GetAllTransaction
)

router.get('/transactions/:transactionid',
    TransactionMiddleware.CheckDeveloperTokenValid,
    TransactionController.SearchTransaction
)


module.exports = router