const UserModel = require('../models/Account.model')
const bcrypt = require('bcrypt')

const UserMidlleware = {
    CheckUserTokenValid: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckUserTokenValid in user middleware error ${error}` });
        }
    },
    CheckDeveloperTokenValid: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in user middleware error ${error}` });
        }
    },
    CreateUserCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateUserCheckEmptyFields in user middleware error ${error}` });
        }
    },
    CreateUserCheckUserIfExists: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateUserCheckUserIfExists in user middleware error ${error}` });
        }
    },
    CreateUserHashedPassword: async (req, res, next) => {
        try {
            const values = req.body
            const hash = await bcrypt.hash(values.password, 10)
            values.password = hash
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateUserHashedPassword in user middleware error ${error}` });
        }
    },
    UpdateUserCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `UpdateUserCheckEmptyFields in user middleware error ${error}` });
        }
    },
}

module.exports = UserMidlleware