const Ticket = require("../models/ticket")
const User = require("../models/user")
const Team = require("../models/team")
const Notification = require("../models/notification")
const Comment = require("../models/comment")
const cloudinary = require("../utils/cloudinary")

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
  // salman said it works fine
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate(["member", "createdBy", "solvedBy"])
      .populate({
        path: "comments",
        populate: {
          path: "member",
          model: "User",
        },
      })
    res.json(ticket)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// i am here right now

const newTicket = async (req, res) => {
  //done
  console.log(req.body)
  console.log(req.files)

  // let attachments = req.files.map((file) => file.filename)
  // console.log(attachments)
  // req.body.attachments = attachments
  // console.log(req.body.attachments)
  // console.log(req.body.attachments[0])

  try {
    // needs to modify this
    // await Promise.all(
    //   req.body.orderItems.map(async (item) => {
    //     const newOrderItem = await OrderItem.create(item)
    //     newOrderItems.push(newOrderItem)
    //   })
    // )

    let attachments = []
    // = req.files.map((file) => file.filename)

    await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(
          file.path,
          { folder: "attachments" },
          function (error, result) {
            console.log("result")
            console.log(result)
            console.log("error")
            console.log(error)
          }
        )
        attachments.push({
          public_id: result.public_id,
          url: result.url,
          name: file.originalname,
        })
        console.log("result after pushing " + result)
      })
    )

    const tic = req.body
    tic.status = "Pending"

    //try salman idea
    let newTicket = await Ticket.create({
      ...req.body,
      attachments,

      logs: { ...req.body, timestamp: new Date() },
    })

    const team = await Team.findByIdAndUpdate(req.params.id, {
      $push: { tickets: newTicket._id },
    })

    const note = {
      content: `${team.name}: ${newTicket.subject} Has Been Created.`,
      member: team.manager,
      ticket: newTicket._id,
      team: req.params.id,
    }
    const t = await Notification.create(note)
    await User.findByIdAndUpdate(team.manager, t._id)

    const fs = require("fs")

    await Promise.all(
      attachments.map(async (file) => {
        // Asynchronously delete a file
        fs.unlink(`./public/data/uploads/${file.name}`, (err) => {
          if (err) {
            // Handle specific error if any
            if (err.code === "ENOENT") {
              console.error("File does not exist.")
            } else {
              throw err
            }
          } else {
            console.log("File deleted!")
          }
        })
      })
    )

    res.json(newTicket)
  } catch (err) {
    console.log(err.message)
    res.json({ error: err.message })
  }
}

const updateTicket = async (req, res) => {
  try {
    // req.body.status = "Processing"
    if (req.body.solvedBy) {
      req.body.status = "Complete"
    }
    let ticket = await Ticket.findByIdAndUpdate(req.params.id, {
      ...req.body,

      member: req.body.member,
      // status: "Processing",
      // $push: { logs: { timestamp: new Date(), status: req.body.status } },
    })

    ticket = await Ticket.findByIdAndUpdate(req.params.id, {
      $push: { logs: { timestamp: new Date(), status: ticket.status } },
    })

    const team = await Team.findOne({ _id: req.query.teamId })

    let note = {
      content: `${team.name}: ${ticket.subject} Has Been Updated.`,
      member: ticket.createdBy,
      ticket: req.params.id,
      team: team._id,
    }

    if (req.body.solvedBy) {
      note = {
        content: `${team.name}: ${ticket.subject} Has Been Solved.`,
        member: ticket.createdBy,
        ticket: req.params.id,
        team: team._id,
      }
    }

    let notification = await Notification.create(note)
    await User.findByIdAndUpdate(ticket.createdBy, {
      $push: { notifications: notification._id },
    })

    note.member = team.manager
    notification = await Notification.create(note)

    await User.findByIdAndUpdate(note.member, {
      $push: { notifications: notification._id },
    })

    res.json(ticket)
  } catch (err) {
    console.log(err.message)
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
      {
        status: "Processing",
        $push: {
          logs: { timestamp: new Date(), status: "Processing" },
          member: req.body.member,
        },
      }
    )
    res.json("ticket has been assign successfully")
  } catch (err) {
    console.log(err.message)
    res.json({ error: err.message })
  }
}
const leaveTicket = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.body.member },
      { $pull: { tickets: req.params.id } }
    )

    const ticket = await Ticket.updateOne(
      { _id: req.params.id },
      { $pull: { member: req.body.member }, status: "Pending" }
    )
    if (ticket.member.length != 0) {
      await Ticket.updateOne({ _id: req.params.id }, { status: "Processing" })
    }

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

const addComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body })
    comment.save()
    const ticket = await Ticket.findById(req.params.id)
    ticket.comments.push(comment._id)
    ticket.save()
    res.send(ticket)
  } catch (error) {
    console.log(error)
  }
}

const deleteComment = async (req, res) => {
  try {
    const ticketId = await Ticket.findById(req.params.id)
    await Ticket.findByIdAndUpdate(
      ticketId,
      { $pull: { comments: req.params.commentId } },
      { new: true }
    )
    await Comment.findOneAndDelete({ _id: req.params.commentId })
    res.send(ticketId)
  } catch (error) {
    console.log("error in delete comment controller", error)
  }
}

module.exports = {
  deleteTicket,
  updateTicket,
  newTicket,
  assignTicket,
  leaveTicket,
  index,
  show,
  addComment,
  deleteComment,
}
