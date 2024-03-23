const express = require('express')
const router = express.Router()
const teamsController = require('../controllers/teams')

router.post('/', teamsController.createTeam)

module.exports = router
