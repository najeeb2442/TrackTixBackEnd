var express = require("express")
var router = express.Router()
const invitesController = require("../controllers/invites.js")
const middleware = require("../middleware/index.js")

//get all invites by user
router.get(
  "/user/:id",
  middleware.stripToken,
  middleware.verifyToken,
  invitesController.index
)
//get a invite
router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  invitesController.show
)
// update invite
router.put(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  invitesController.updateInvite
)
// create a invite
router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  invitesController.newInvite
)
// delete a invite
// router.delete(
//   "/:id",
//   middleware.stripToken,
//   middleware.verifyToken,
//   invitesController.deleteInvite
// )

module.exports = router
