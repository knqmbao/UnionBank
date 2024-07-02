const AccountModel = require('../models/Account.model')
const UserModel = require('../models/Users.model')

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const { name, email, mobileno, password } = req.body
            // console.log('Create User Controller: ', values)
            const data = await UserModel.create({ name, email, mobileno, password })
            res.json({ success: true, message: 'User created successfully!', data: data?._id })
        } catch (error) {
            res.json({ error: `CreateUser in user controller error ${error}` });
        }
    },
    GetAllUsers: async (req, res) => {
        try {
            const data = await UserModel.find()
            res.json({ success: true, message: 'Fetch user successfully!', data })
        } catch (error) {
            res.json({ error: `GetAllUser in user controller error ${error}` });
        }
    },
    GetAllRBUsers: async (req, res) => {
        try {
            const usersWithoutAccounts = await UserModel.aggregate([
                // Match users with role 'user'
                { $match: { role: 'user' } },

                // Lookup accounts associated with each user
                {
                    $lookup: {
                        from: 'accounts',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'accounts',
                    },
                },

                // Match users who do not have any accounts
                { $match: { accounts: { $size: 0 } } },

                // Project the fields to include in the result
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        mobileno: 1,
                        isactive: 1,
                        isdeveloper: 1,
                    },
                },
            ]);


            res.json({ success: true, message: 'Fetch user successfully!', data: usersWithoutAccounts })
        } catch (error) {
            res.json({ error: `GetAllRBUser in user controller error ${error}` });
        }
    },
    GetAllRBAccounts: async (req, res) => {
        try {
            const accountsWithUsers = await AccountModel.aggregate([
                // Lookup users associated with each account
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },

                // Unwind the user array to de-normalize the data
                { $unwind: '$user' },

                // Project the fields to include in the result
                {
                    $project: {
                        _id: 1,
                        accountno: 1,
                        accountType: 1,
                        balance: 1,
                        isactive: 1,
                        user: {
                            _id: '$user._id',
                            name: '$user.name',
                            email: '$user.email',
                            mobileno: '$user.mobileno',
                            isactive: '$user.isactive',
                            isdeveloper: '$user.isdeveloper',
                        },
                    },
                },
            ]);

            res.json({ success: true, message: 'Fetch user successfully!', data: accountsWithUsers })
        } catch (error) {
            res.json({ error: `GetAllUser in user controller error ${error}` });
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
            res.json({ error: `SearchUser in user controller error ${error}` });
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
            res.json({ error: `UpdateUser in user controller error ${error}` });
        }
    },
    UpdateActiveUser: async (req, res) => {
        try {
            const { userId } = req.params
            const { isactive } = req.body

            const data = await UserModel.findByIdAndUpdate(
                userId,
                {
                    isactive: isactive
                },
                { new: true }
            )
            res.json({ success: true, message: 'User active updated successfully!', data })
        } catch (error) {
            res.json({ error: `UpdateActiveUser in user controller error ${error}` });
        }
    }
}

module.exports = UserController