const AccountModel = require('../models/Account.model')

const AccountController = {
    CreateAccount: async (req, res) => {
        try {
            const { accno } = req
            const { userId, accountType } = req.body

            const data = await AccountModel.create({ userId, accountno: accno, accountType })
            res.json({ success: true, message: 'Account created successfully!', data })
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
            const { userId } = req.params
            console.log('Search Account Controller: ', userId)

            const data = await AccountModel.find({ user: userId })
            res.json({ success: true, message: 'Fethced certain account successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `SearchAccount in account controller error ${error}` });
        }
    },
    UpdateAccount: async (req, res) => {
        try {
            const { accountId } = req.params
            const values = req.body
            console.log('Update Account Controller: ', values, accountId)


            res.json({ success: true, message: 'Account updated successfully!', values, accountId })
        } catch (error) {
            res.status(400).json({ error: `UpdateAccount in account controller error ${error}` });
        }
    },
    UpdateActiveAccount: async (req, res) => {
        try {
            const { accountId } = req.params
            const { isactive } = req.body
            console.log('Update Active Account Controller: ', isactive, accountId)

            const data = await AccountModel.findOneAndUpdate(
                { user: accountId },
                { isactive: isactive },
                { new: true }
            )
            res.json({ success: true, message: 'Account active updated successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `UpdateActiveAccount in account controller error ${error}` });
        }
    }
}

module.exports = AccountController