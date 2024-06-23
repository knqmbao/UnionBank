const express = require('express')
const router = express.Router()

const DeveloperController = require('../controllers/Developer.controller')
const DeveloperMiddleware = require('../middleware/Developer.middleware')

router.post('/createdevelopertoken/:userId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperMiddleware.CreateDeveloperTokenCheckTokenIfExist,
    DeveloperMiddleware.CreateDeveloperTokenHashed,
    DeveloperController.CreateDeveloperToken
)

router.get('/tokens',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GetAllTokens
)

router.post('/deletetoken/:developerId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.DeleteToken
)

module.exports = router