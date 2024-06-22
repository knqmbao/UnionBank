const TransactionModel = require('../models/Transactions.model')
const DeveloperModel = require('../models/Developer.model')
const bcrypt = require('bcrypt')

const TransactionMidlleware = {
    CheckDeveloperTokenValid: async (req, res, next) => {
        try {
            const { developerId } = req.body
            const user = await DeveloperModel.findById(developerId)
            if (user) {
                const testToken = bcrypt.compare(developerId, user.token)
                if (testToken) {
                    next()
                } else {
                    res.json({ success: false, message: 'Token do not exist nor match' })
                }
            } else {
                res.json({ success: false, message: 'A token is required!' })
            }
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in transaction middleware error ${error}` });
        }
    },
    CreateTransactionCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateTransactionCheckEmptyFields in transaction middleware error ${error}` });
        }
    }
}

module.exports = TransactionMidlleware