const AccountModel = require('../models/Account.model')

const AccountController = {
    CreateAccount: async (req, res) => {
        try {
            const values = req.body
            console.log('Create Account Controller: ', values)
            res.json({ success: true, message: 'Account created successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `CreateAccount in account controller error ${error}` });
        }
    },
    GetAllAccount: async (req, res) => {
        try {
            const data = await AccountModel.find()
            res.json({ success: true, message: 'Fetch accounts successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `GetAllAccount in account controller error ${error}` });
        }
    },
    SearchAccount: async (req, res) => {
        try {
            const { accountId } = req.params
            console.log('Search Account Controller: ', accountId)
            res.json({ success: true, message: 'Fethced certain account successfully!', accountId })
        } catch (error) {
            res.status(400).json({ error: `SearchAccount in account controller error ${error}` });
        }
    },
    UpdateAccount: async (req, res) => {
        try {
            const values = req.body
            console.log('Update Account Controller: ', values)
            res.json({ success: true, message: 'Account updated successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `UpdateAccount in account controller error ${error}` });
        }
    },
    UpdateActiveAccount: async (req, res) => {
        try {
            const values = req.body
            console.log('Update Active Account Controller: ', values)
            res.json({ success: true, message: 'Account active updated successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `UpdateActiveAccount in account controller error ${error}` });
        }
    }
}

module.exports = AccountController