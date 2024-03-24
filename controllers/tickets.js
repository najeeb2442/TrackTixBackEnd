const Ticket = require("../models/ticket")
const User = require("../models/user")
const Team = require("../models/team")
const Notification = require("../models/notification")
const Comment = require("../models/comment")

const index = async (req, res) => {
  //done
  try {
    //   .populate(["member", "createdBy", "solvedBy"]);

    // let tickets = await Ticket.find({ _id: req.params.id }).populate([
    //   {
    //     path: "member",
    //     model: "User",
    //   },
    //   {
    //     path: "createdBy",
    //     model: "User",
    //   },
    //   {
    //     path: "solvedBy",
    //     model: "User",
    //   },
    //   // {
    //   //   path: "logs",
    //   //   model: "User",
    //   //   populate:{}
    //   // },
    //   {
    //     path: "comments",
    //     model: "Comment",
    //     populate: { path: "member", model: "User" },
    //   },
    // ])

    let teams = await Team.findOne({ _id: req.params.id }).populate({
      path: "tickets",
      populate: [
        {
          path: "member",
          model: "User",
        },
        {
          path: "createdBy",
          model: "User",
        },
        {
          path: "solvedBy",
          model: "User",
        },
        {
          path: "comments",
          model: "Comment",
          populate: { path: "member", model: "User" },
        },
      ],
    })
    // console.log("ee")
    res.json(teams.tickets)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const show = async (req, res) => {
  // done
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate(["member", "createdBy", "solvedBy", "comments"])
      .populate({ path: "comments.member", model: "User" })
    res.json(ticket)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// i am here right now

const newTicket = async (req, res) => {
  //done
  try {
    let newTicket = await Ticket.create({ ...req.body, logs: req.body })

    await Team.updateOne(
      { _id: req.params.id },
      { $push: { tickets: newTicket._id } }
    )

    res.json(newTicket)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const updateTicket = async (req, res) => {
  try {
    // req.body.status = true
    let ticket = await Ticket.updateOne({ _id: req.params.id }, req.body)
    ticket = await Ticket.updateOne({ _id: req.params.id }, { logs: req.body })

    const note = {
      content: "Ticket has been updated.",
      member: ticket.createdBy,
      ticket: req.params.id,
    }

    const notification = await Notification.create(note)

    res.json(ticket)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const assignTicket = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.body.member },
      { $push: { tickets: req.params.id } }
    )
    await Ticket.updateOne(
      { _id: req.params.id },
      { $push: { member: req.body.member } }
    )
    res.json("ticket has been assign successfully")
  } catch (err) {
    res.json({ error: err.message })
  }
}
const removeTicket = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.body.member },
      { $pull: { tickets: req.params.id } }
    )
    await Ticket.updateOne(
      { _id: req.params.id },
      { $push: { member: req.body.member } }
    )
    res.json("ticket has been removed successfully")
  } catch (err) {
    res.json({ error: err.message })
  }
}

const deleteTicket = async (req, res) => {
  try {
    // if (res.locals.payload) {
    //   if (
    //     res.locals.payload.role == "Admin" ||
    //     res.locals.payload.role == "customer"
    //   ) {
    //   }
    // }
    await Ticket.deleteOne({ _id: req.params.id }).exec()
    res.json(true)
  } catch (err) {
    res.json({ error: err.message })
  }
}

module.exports = {
  deleteTicket,
  updateTicket,
  newTicket,
  assignTicket,
  removeTicket,
  index,
  show,
}
