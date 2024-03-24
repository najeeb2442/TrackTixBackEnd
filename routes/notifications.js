var express = require("express")
var router = express.Router()
const notificationsController = require("../controllers/notifications.js")
const middleware = require("../middleware/index.js")

//send all notifications
router.get(
  "/user/:id",
  middleware.stripToken,
  middleware.verifyToken,
  notificationsController.index
)
//send a notification
// router.get(
//   "/:id",
//   middleware.stripToken,
//   middleware.verifyToken,
//   notificationsController.show
// )
// update notification
// router.put(
//   "/:id",
//   middleware.stripToken,
//   middleware.verifyToken,
//   notificationsController.updateNotification
// )
// create a notification
// router.post(
//   "/",
//   middleware.stripToken,
//   middleware.verifyToken,
//   notificationsController.newNotification
// )
// assign a user a notification
// router.put(
//   "/user/:id",
//   middleware.stripToken,
//   middleware.verifyToken,
//   notificationsController.assignNotification
// )

// delete a notification
router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  notificationsController.deleteNotification
)

// delete a notification
router.delete(
  "/user/:id",
  middleware.stripToken,
  middleware.verifyToken,
  notificationsController.deleteAllNotification
)

module.exports = router
