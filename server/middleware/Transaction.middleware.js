const TransactionModel = require('../models/Transactions.model')
const DeveloperModel = require('../models/Developer.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const TransactionMidlleware = {
    CheckUserTokenValid: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token === null) return res.json({ authorization: `You are not authorized: null` })
            if (token === undefined) return res.json({ authorization: `You are not authorized: undefined` })

            jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
                // if (err) return res.sendStatus(403)
                if (err) return res.json({ authorization: `You are not authorized. : ${err}` })
                req.userId = decoded.userId
                next()
            })
        } catch (error) {
            res.status(400).json({ error: `CheckUserTokenValid in user middleware error ${error}` });
        }
    },
    CheckDeveloperTokenValid: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token === null) return res.json({ authorization: `You are not authorized: null` })
            if (token === undefined) return res.json({ authorization: `You are not authorized: undefined` })

            if (token === process.env.ADMIN_TOKEN) return next()
            res.json({ success: false, message: 'A token is required, nor token is incorrect!' })
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in transaction middleware error ${error}` });
        }
    },
    CreateTransactionCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateTransactionCheckEmptyFields in transaction middleware error ${error}` });
        }
    }
}

module.exports = TransactionMidlleware