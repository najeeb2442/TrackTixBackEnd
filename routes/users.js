var express = require('express')
var router = express.Router()
const middleware = require('../middleware')

const usersController = require('../controllers/users')

// get all users
router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  usersController.index
)
// send user
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  usersController.show
)
// update user
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  usersController.updateUser
)

// create a user

// router.post(
//   "/",
//   middleware.stripToken,
//   middleware.verifyToken,
//   usersController.newUser
// );

// delete a user
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  usersController.deleteUser
)

router.get(
  '/:id/teams',
  middleware.stripToken,
  middleware.verifyToken,
  usersController.getTeams
)

module.exports = router
