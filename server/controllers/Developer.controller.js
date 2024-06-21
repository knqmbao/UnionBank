const DeveloperModel = require('../models/Developer.model')

const DeveloperController = {
    CreateDeveloperAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperAccount in developer controller error ${error}` });
        }
    },
    CreateDeveloperToken: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperToken in developer controller error ${error}` });
        }
    },
    GetAllTokens: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `GetAllTokens in developer controller error ${error}` });
        }
    },
}

module.exports = DeveloperController