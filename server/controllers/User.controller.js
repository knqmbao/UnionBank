const UserModel = require('../models/Users.model')

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const values = req.body
            console.log('Create User Controller: ', values)
            res.json({ success: true, message: 'User created successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `CreateUser in user controller error ${error}` });
        }
    },
    GetAllUsers: async (req, res) => {
        try {
            const data = await UserModel.find()
            res.json({ success: true, message: 'Fetch user successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `GetAllUser in user controller error ${error}` });
        }
    },
    SearchUser: async (req, res) => {
        try {
            const { accountId } = req.params
            console.log('Search User Controller: ', accountId)
            res.json({ success: true, message: 'Fethced certain user successfully!', accountId })
        } catch (error) {
            res.status(400).json({ error: `SearchUser in user controller error ${error}` });
        }
    },
    UpdateUser: async (req, res) => {
        try {
            const values = req.body
            console.log('Update User Controller: ', values)
            res.json({ success: true, message: 'User updated successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `UpdateUser in user controller error ${error}` });
        }
    },
    UpdateActiveUser: async (req, res) => {
        try {
            const values = req.body
            console.log('Update Active User Controller: ', values)
            res.json({ success: true, message: 'User active updated successfully!', values })
        } catch (error) {
            res.status(400).json({ error: `UpdateActiveUser in user controller error ${error}` });
        }
    }
}

module.exports = UserController