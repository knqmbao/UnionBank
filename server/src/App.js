const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    credentials: true,
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: `This is Home`
    })
})

module.exports = app;