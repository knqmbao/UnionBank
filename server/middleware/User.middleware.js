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
            const testToken = await DeveloperModel.findOne({ token: token })

            if (testToken || token === process.env.ADMIN_TOKEN) return next()
            res.json({ success: false, message: 'A token is required, nor token is incorrect!' })
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenValid in user middleware error ${error}` });
        }
    },
    LoginUserCheckEmptyFields: async (req, res, next) => {
        try {
            const { mobileno, password } = req.body
            if (!mobileno || !password) return res.json({ success: false, message: 'Required fields should not be empty.' })
            next()
        } catch (error) {
            res.status(400).json({ error: `LoginUserCheckEmptyFields in user middleware error ${error}` });
        }
    },
    LoginUserCheckMobileNo: async (req, res, next) => {
        try {
            const { mobileno } = req.body
            const testMobileNo = await UserModel.findOne({ mobileno: mobileno })
            if (mobileno !== testMobileNo.mobileno) return res.json({ success: false, message: 'User not found.', testMobileNo })
            next()
        } catch (error) {
            res.status(400).json({ error: `LoginUserCheckUsername in user middleware error ${error}` });
        }
    },
    LoginUserCheckPassword: async (req, res) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
                auth: {
                    user: 'yourparengmarc@gmail.com', // Your email address
                    pass: 'Medsako12345' // Your email password or an app-specific password
                }
            });

            // Verify the connection configuration
            transporter.verify((error, success) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Server is ready to take our messages');
                }
            });

            const mailOptions = {
                from: 'yourparengmarc@gmail.com',
                to: 'edisonsuarez360@gmail.com',
                subject: 'Testing nodemailer',
                text: 'Tite',
                html: '<p>HTML version of the content</p>'
              };
              
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
              });
              

            const { mobileno, password } = req.body
            const user = await UserModel.findOne({ mobileno: mobileno })

            if (user) {
                const testPassword = bcrypt.compare(password, user.password)
                if (testPassword) {
                    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: '1d' })
                    res.json({ success: true, message: 'Login Successful.', token, name: user.name, accountId: user.mobileno, userId: user._id })
                } else {
                    res.json({ success: false, message: 'Username nor Password Incorrect!' })
                }
            } else {
                res.json({ success: false, message: 'Username nor Password Incorrect!' })
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