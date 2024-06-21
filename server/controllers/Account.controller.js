const AccountModel = require('../models/Account.model')

const AccountController = {
    CreateAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateAccount in user controller error ${error}` });
        }
    },
    GetAllAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `GetAllAccount in user controller error ${error}` });
        }
    },
    SearchAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `SearchAccount in user controller error ${error}` });
        }
    },
    UpdateAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `UpdateAccount in user controller error ${error}` });
        }
    },
    UpdateActiveAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `UpdateActiveAccount in user controller error ${error}` });
        }
    }
}

module.exports = AccountController