const TransactionModel = require('../models/Transactions.model')

const TransactionMidlleware = {
    CheckDeveloperTokenValid: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in transaction middleware error ${error}` });
        }
    },
    CreateTransactionCheckEmptyFields: async (req, res, next) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateTransactionCheckEmptyFields in transaction middleware error ${error}` });
        }
    }
}

module.exports = TransactionMidlleware