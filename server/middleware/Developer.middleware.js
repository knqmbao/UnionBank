const DeveloperModel = require('../models/Developer.model')

const DeveloperMiddleware = {
    CheckDeveloperTokenValid: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in developer middleware error ${error}` });
        }
    },
    CreateDeveloperCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperCheckEmptyFields in developer middleware error ${error}` });
        }
    },
    CreateDeveloperTokenCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperTokenCheckEmptyFields in developer middleware error ${error}` });
        }
    }
}

module.exports = DeveloperMiddleware