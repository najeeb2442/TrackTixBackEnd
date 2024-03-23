var express = require("express")
var router = express.Router()
const rolesController = require("../controllers/roles.js")
const middleware = require("../middleware/index.js")

//send all roles
router.get(
  "/team/:id",
  middleware.stripToken,
  middleware.verifyToken,
  rolesController.index
)
//send a role
router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  rolesController.show
)
// update role
router.put(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  rolesController.updateRole
)
// create a role
router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  rolesController.newRole
)
// assign a user a Role
router.put(
  "/user/:id",
  middleware.stripToken,
  middleware.verifyToken,
  rolesController.assignRole
)

// delete a role
router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  rolesController.deleteRole
)

module.exports = router
