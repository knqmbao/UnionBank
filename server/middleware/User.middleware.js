const UserModel = require('../models/Account.model')

const UserMidlleware = {
    CreateUserCheckEmptyFields: async (req, res, next) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateUserCheckEmptyFields in user middleware error ${error}` });
        }
    },
    CreateUserCheckUserIfExists: async (req, res, next) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateUserCheckUserIfExists in user middleware error ${error}` });
        }
    },
}

module.exports = UserMidlleware