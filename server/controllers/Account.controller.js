const AccountModel = require('../models/Account.model')

const AccountController = {
    CreateAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `CreateAccount in account controller error ${error}` });
        }
    },
    GetAllAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `GetAllAccount in account controller error ${error}` });
        }
    },
    SearchAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `SearchAccount in account controller error ${error}` });
        }
    },
    UpdateAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `UpdateAccount in account controller error ${error}` });
        }
    },
    UpdateActiveAccount: async (req, res) => {
        try {

        } catch (error) {
            res.status(400).json({ error: `UpdateActiveAccount in account controller error ${error}` });
        }
    }
}

module.exports = AccountController