const AccountModel = require('../models/Account.model')

const AccountMidlleware = {
    CreateAccountCheckEmptyFields: async (req, res, next) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateCheckEmptyFields in account middleware error ${error}` });
        }
    },
    CreateAccountCheckAccountIfExists: async (req, res, next) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CheckAccountIfExists in account middleware error ${error}` });
        }
    },
}

module.exports = AccountMidlleware