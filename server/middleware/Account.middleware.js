const AccountModel = require('../models/Account.model')
const DeveloperModel = require('../models/Developer.model')
const bcrypt = require('bcrypt')

const AccountMidlleware = {
    CheckDeveloperTokenValid: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token === null) return res.json({ authorization: `You are not authorized: null` })
            if (token === undefined) return res.json({ authorization: `You are not authorized: undefined` })
                
            const testToken = await DeveloperModel.findOne(token)
            if (token !== testToken) return res.json({ success: false, message: 'A token is required!' })
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