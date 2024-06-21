const UserModel = require('../models/Users.model')

const UserController = {
    CreateUser: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateUser in user controller error ${error}` });
        }
    },
    GetAllUsers: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `GetAllUser in user controller error ${error}` });
        }
    },
    SearchUser: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `SearchUser in user controller error ${error}` });
        }
    },
    UpdateUser: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `UpdateUser in user controller error ${error}` });
        }
    },
    UpdateActiveUser: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `UpdateActiveUser in user controller error ${error}` });
        }
    }
}

module.exports = UserController