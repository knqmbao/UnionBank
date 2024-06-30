const UserModel = require('../models/Users.model')
const DeveloperModel = require('../models/Developer.model')
const AccountModel = require('../models/Account.model')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserMidlleware = {
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
            res.status(400).json({ error: `CheckDeveloperTokenValid in user middleware error ${error}` });
        }
    },
    LoginUserCheckEmptyFields: async (req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email || !password) return res.json({ success: false, message: 'Required fields should not be empty.' })
            next()
        } catch (error) {
            res.status(400).json({ error: `LoginUserCheckEmptyFields in user middleware error ${error}` });
        }
    },
    LoginUserCheckEmail: async (req, res, next) => {
        try {
            const { email } = req.body
            const testEmail = await UserModel.findOne({ email: email })
            if (testEmail.length > 0) return res.json({ success: false, message: 'User not found.', testEmail })
            next()
        } catch (error) {
            res.status(400).json({ error: `LoginUserCheckUsername in user middleware error ${error}` });
        }
    },
    LoginUserCheckPassword: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await UserModel.findOne({ email: email })

            if (user) {
                const testPassword = await bcrypt.compare(password, user.password)

                if (testPassword) {
                    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: '1d' })
                    res.json({ success: true, message: 'Login Successful.', token, name: user.name, userId: user._id, role: user.role })
                } else {
                    res.json({ success: false, message: 'Email or password is Incorrect!' })
                }
            } else {
                res.json({ success: false, message: 'Email or password is Incorrect!' })
            }
        } catch (error) {
            res.status(400).json({ error: `LoginUserCheckPassword in user middleware error ${error}` });
        }
    },
    CreateUserCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateUserCheckEmptyFields in user middleware error ${error}` });
        }
    },
    CreateUserCheckUserIfExists: async (req, res, next) => {
        try {
            const { email, mobileno } = req.body
            const testEmail = await UserModel.find(
                {
                    email: { $regex: new RegExp(email, 'i') }
                }
            )
            const testMobileNo = await UserModel.find(
                {
                    mobileno: { $regex: new RegExp(mobileno, 'i') }
                }
            )
            if (testEmail.length > 0) return res.json({ success: false, message: 'Email already exists!' })
            if (testMobileNo.length > 0) return res.json({ success: false, message: 'Mobile number already exists!' })
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateUserCheckUserIfExists in user middleware error ${error}` });
        }
    },
    CreateUserHashedPassword: async (req, res, next) => {
        try {
            const values = req.body
            const hash = await bcrypt.hash(values.password, 10)
            values.password = hash
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateUserHashedPassword in user middleware error ${error}` });
        }
    },
    UpdateUserCheckEmptyFields: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `UpdateUserCheckEmptyFields in user middleware error ${error}` });
        }
    },
}

module.exports = UserMidlleware