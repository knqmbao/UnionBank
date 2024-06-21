const express = require('express')
const router = express.Router()

const DeveloperController = require('../controllers/Developer.controller')
const DeveloperMiddleware = require('../middleware/Developer.middleware')

router.post('/createdeveloperaccount',
    DeveloperMiddleware.CreateDeveloperCheckEmptyFields,
    DeveloperController.CreateDeveloperAccount
)

router.post('/createdevelopertoken',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperMiddleware.CreateDeveloperTokenCheckEmptyFields,
    DeveloperController.CreateDeveloperToken
)

router.get('/tokens',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GetAllTokens
)

router.post('/deletetoken/:tokenId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.DeleteToken
)

module.exports = router