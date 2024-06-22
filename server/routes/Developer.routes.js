const express = require('express')
const router = express.Router()

const DeveloperController = require('../controllers/Developer.controller')
const DeveloperMiddleware = require('../middleware/Developer.middleware')

router.post('/createdeveloperaccount',
    DeveloperMiddleware.CreateDeveloperAccountCheckEmptyFields,
    DeveloperMiddleware.CreateDeveloperAccountCheckSccountIfExists,
    DeveloperController.CreateDeveloperAccount
)

router.post('/createdevelopertoken/:accountId',
    DeveloperMiddleware.CheckDeveloperTokenCheckIfExist,
    DeveloperMiddleware.CreateDeveloperTokenHashed,
    DeveloperController.CreateDeveloperToken
)

router.get('/tokens',
    DeveloperMiddleware.CheckDeveloperTokenCheckIfExist,
    DeveloperController.GetAllTokens
)

router.post('/deletetoken/:tokenId',
    DeveloperMiddleware.CheckDeveloperTokenCheckIfExist,
    DeveloperController.DeleteToken
)

module.exports = router