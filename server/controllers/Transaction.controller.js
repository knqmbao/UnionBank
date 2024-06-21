const TransactionModel = require('../models/Transactions.model')

const TransactionController = {
    CreateTransaction: async (req, res) => {
        try {
            const values = req.body
            console.log('Create Transaction Controller: ', values)
            res.json({ success: true, message: 'Transaction created successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `CreateTransaction in transaction controller error ${error}` });
        }
    },
    GetAllTransaction: async (req, res) => {
        try {
            const data = await TransactionModel.find()
            res.json({ success: true, message: 'Fetch transactions successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `GetAllTransaction in transaction controller error ${error}` });
        }
    },
    SearchTransaction: async (req, res) => {
        try {
            const { accountId } = req.params
            console.log('Search Transaction Controller: ', accountId)
        } catch (error) {
            res.status(400).json({ error: `SearchTransaction in transaction controller error ${error}` });
        }
    }
}

module.exports = TransactionController