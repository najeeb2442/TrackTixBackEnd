var express = require('express')
var router = express.Router()
const ticketsController = require('../controllers/tickets')
const middleware = require('../middleware')

//send all tickets
router.get(
  '/team/:id',
  middleware.stripToken,
  middleware.verifyToken,
  ticketsController.index
)
//send a ticket
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  ticketsController.show
)
// update ticket
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  ticketsController.updateTicket
)
// assign a ticket to a user
router.put(
  '/:id/assign',
  middleware.stripToken,
  middleware.verifyToken,
  ticketsController.assignTicket
)
// remove a ticket from a user
router.put(
  '/:id/remove',
  middleware.stripToken,
  middleware.verifyToken,
  ticketsController.leaveTicket
)
// create a ticket
router.post(
  '/team/:id',
  middleware.stripToken,
  middleware.verifyToken,
  ticketsController.newTicket
)
// delete a ticket
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  ticketsController.deleteTicket
)

module.exports = router
