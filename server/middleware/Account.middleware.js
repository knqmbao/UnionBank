const AccountModel = require('../models/Account.model')

const AccountMidlleware = {
    CheckDeveloperTokenValid: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in account middleware error ${error}` });
        }
    },
    CreateAccountCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateCheckEmptyFields in account middleware error ${error}` });
        }
    },
    CreateAccountCheckAccountIfExists: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckAccountIfExists in account middleware error ${error}` });
        }
    },
    UpdateAccountCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `UpdateAccountCheckEmptyFields in account middleware error ${error}` });
        }
    },
}

module.exports = AccountMidlleware