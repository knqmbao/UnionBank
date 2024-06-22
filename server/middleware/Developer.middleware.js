const DeveloperModel = require('../models/Developer.model')
const bcrypt = require('bcrypt')

const DeveloperMiddleware = {
    CreateDeveloperAccountCheckSccountIfExists: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperAccountCheckSccountIfExists in developer middleware error ${error}` });
        }
    },
    CheckDeveloperTokenCheckIfExist: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenCheckIfExist in developer middleware error ${error}` });
        }
    },
    CheckDeveloperTokenValid: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in developer middleware error ${error}` });
        }
    },
    CreateDeveloperAccountCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperAccountCheckEmptyFields in developer middleware error ${error}` });
        }
    },
    CreateDeveloperTokenHashed: async (req, res, next) => {
        try {
            const min = 1000000000
            const max = 9999999999
            const RandomIntegers = Math.floor(Math.random() * (max - min + 1)) + min
            const hash = bcrypt.hash(RandomIntegers.toString(), 10)
            req.hashedToken = hash
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperTokenHashed in developer middleware error ${error}` });
        }
    }
}

module.exports = DeveloperMiddleware