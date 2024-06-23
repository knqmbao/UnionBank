const DeveloperModel = require('../models/Developer.model')

const DeveloperController = {
    CreateDeveloperToken: async (req, res) => {
        try {
            const { userId } = req.params
            const token = await req.hashedToken
            const newToken = await DeveloperModel.create({ user: userId, token })

            console.log('Create Tokens Controller: ', newToken)
            res.json({ success: true, message: 'Tokens created successfully!', newToken })
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