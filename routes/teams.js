var express = require("express")
var router = express.Router()
const teamsController = require("../controllers/teams.js")
const middleware = require("../middleware")

//send all teams
router.get(
  "/user/:id",
  middleware.stripToken,
  middleware.verifyToken,
  teamsController.index
)
//send a team
router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  teamsController.show
)
// update team
router.put(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  teamsController.updateTeam
)
// create a team
router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  teamsController.newTeam
)
// delete a team
router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  teamsController.deleteTeam
)

module.exports = router
