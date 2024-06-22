const AccountModel = require('../models/Account.model')
const DeveloperModel = require('../models/Developer.model')
const bcrypt = require('bcrypt')

const AccountMidlleware = {
    CheckUserTokenValid: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token === null) return res.json({ authorization: `You are not authorized: null` })
            if (token === undefined) return res.json({ authorization: `You are not authorized: undefined` })

            jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
                // if (err) return res.sendStatus(403)
                if (err) return res.json({ authorization: `You are not authorized. : ${err}` })
                req.userId = decoded.userId
                next()
            })
        } catch (error) {
            res.status(400).json({ error: `CheckUserTokenValid in user middleware error ${error}` });
        }
    },
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