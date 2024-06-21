const DeveloperModel = require('../models/Developer.model')

const DeveloperController = {
    CreateDeveloperAccount: async (req, res) => {
        try {
            const values = req.body
            console.log('Create Tokens Controller: ', values)
            res.json({ success: true, message: 'Tokens created successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperAccount in developer controller error ${error}` });
        }
    },
    CreateDeveloperToken: async (req, res) => {
        try {
            const values = req.body
            console.log('Create Tokens Controller: ', values)
            res.json({ success: true, message: 'Tokens created successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperToken in developer controller error ${error}` });
        }
    },
    GetAllTokens: async (req, res) => {
        try {
            const data = await DeveloperModel.find()
            res.json({ success: true, message: 'Fetch tokens successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `GetAllTokens in developer controller error ${error}` });
        }
    },
    DeleteToken: async (req, res) => {
        try {
            const { tokenId } = req.params
            res.json({ success: true, message: 'Token deleted successfully!', tokenId })
        } catch (error) {
            res.status(400).json({ error: `DeleteToken in developer controller error ${error}` });
        }
    }
}

module.exports = DeveloperController