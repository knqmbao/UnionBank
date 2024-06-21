const TransactionModel = require('../models/Transactions.model')

const TransactionController = {
    CreateTransaction: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateTransaction in transaction controller error ${error}` });
        }
    },
    GetAllTransaction: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `GetAllTransaction in transaction controller error ${error}` });
        }
    },
    SearchTransaction: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `SearchTransaction in transaction controller error ${error}` });
        }
    }
}

module.exports = TransactionController