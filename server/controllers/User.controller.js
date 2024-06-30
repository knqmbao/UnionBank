const UserModel = require('../models/Users.model')

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const { name, email, mobileno, password } = req.body
            // console.log('Create User Controller: ', values)
            await UserModel.create({ name, email, mobileno, password })
            res.json({ success: true, message: 'User created successfully!' })
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
            const { name } = req.params
            console.log('Search User Controller: ', name)

            const data = await UserModel.find(
                {
                    name: { $regex: new RegExp(name, 'i') }
                }
            )
            res.json({ success: true, message: 'Fetched certain user successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `SearchUser in user controller error ${error}` });
        }
    },
    UpdateUser: async (req, res) => {
        try {
            const { userId } = req.params
            const { name, password } = req.body
            console.log('Update User Controller: ', { name, password, userId })

            const data = await UserModel.findByIdAndUpdate(
                userId,
                {
                    name: name
                },
                { new: true }
            )
            res.json({ success: true, message: 'User updated successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `UpdateUser in user controller error ${error}` });
        }
    },
    UpdateActiveUser: async (req, res) => {
        try {
            const { userId } = req.params
            const { isactive } = req.body
            console.log('Update Active User Controller: ', isactive, userId)

            const data = await UserModel.findByIdAndUpdate(
                userId,
                {
                    isactive: isactive
                },
                { new: true }
            )
            res.json({ success: true, message: 'User active updated successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `UpdateActiveUser in user controller error ${error}` });
        }
    }
}

module.exports = UserController