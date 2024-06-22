const DeveloperModel = require('../models/Developer.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const DeveloperMiddleware = {
    // CreateDeveloperAccountCheckSccountIfExists: async (req, res, next) => {
    //     try {
    //         next()
    //     } catch (error) {
    //         res.status(400).json({ error: `CreateDeveloperAccountCheckSccountIfExists in developer middleware error ${error}` });
    //     }
    // },
        // CreateDeveloperAccountCheckEmptyFields: async (req, res, next) => {
    //     try {
    //         next()
    //     } catch (error) {
    //         res.status(400).json({ error: `CreateDeveloperAccountCheckEmptyFields in developer middleware error ${error}` });
    //     }
    // },
    CreateDeveloperTokenCheckTokenIfExist: async (req, res, next) => {
        try {
            next()
        } catch (error) {
            res.status(400).json({ error: `CheckDeveloperTokenCheckIfExist in developer middleware error ${error}` });
        }
    },
    CheckDeveloperTokenValid: async (req, res, next) => {
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
            res.status(400).json({ error: `CheckDeveloperTokenValid in developer middleware error ${error}` });
        }
    },
    CreateDeveloperTokenHashed: async (req, res, next) => {
        try {
            const min = 1000000000
            const max = 9999999999
            const RandomIntegers = Math.floor(Math.random() * (max - min + 1)) + min
            const hash = bcrypt.hash(RandomIntegers.toString(), 10)
            req.hashedToken = hash
            next()
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperTokenHashed in developer middleware error ${error}` });
        }
    }
}

module.exports = DeveloperMiddleware