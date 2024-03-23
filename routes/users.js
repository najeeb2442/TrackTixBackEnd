var express = require('express')
var router = express.Router()
const usersController = require('../controllers/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id/teams', usersController.getTeams)
// create a user
router.post('/', usersController.newUser)

module.exports = router
