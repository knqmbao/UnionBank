const AccountModel = require('../models/Account.model')
const DeveloperModel = require('../models/Developer.model')
const bcrypt = require('bcrypt')

const AccountMidlleware = {
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
            res.status(400).json({ error: `CreateAccountCheckAccountIfExists in account middleware error ${error}` });
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