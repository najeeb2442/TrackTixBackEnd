const Notification = require("../models/notification.js")
const Team = require("../models/team.js")
const User = require("../models/user.js")
const Role = require("../models/role.js")

const index = async (req, res) => {
  //done
  try {
    let notifications = await Notification.find({
      member: req.params.id,
    }).populate([
      {
        path: "member",
        model: "User",
      },
      {
        path: "ticket",
        model: "Ticket",
      },
    ])
    res.json(notifications)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// const show = async (req, res) => {
//   // done
//   try {
//     const notification = await Notification.findById(req.params.id).populate([
// {
//   path: "member",
//   model: "User",
// },
// {
//   path: "ticket",
//   model: "Ticket",
// },
//     ])

//     res.json(notification)
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// }

// const newNotification = async (req, res) => {
//   //done
//   try {
//     const user = await User.findOne({ email: req.body.member })

//     if (user) {
//       req.body.member = user._id
//       const notification = await Notification.create(req.body)
//       // const
//       await User.updateOne(
//         { _id: req.body.member },
//         { $push: { notifications: Notification._id } }
//       )
//       res.send("Notification Sent")
//     } else {
//       res.json("Email Not Found")
//     }
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// }

// const updateNotification = async (req, res) => {
//   try {
//     // req.body.status = true
//     const notification = await Notification.findById(req.params.id)

//     if (req.body.status == true) {
//       await User.updateOne(
//         { _id: notification.member },
//         { $push: { teams: notification.team } }
//       )
//       await Team.updateOne(
//         { _id: notification.team },
//         { $push: { members: notification.member } }
//       )
//     }
//     await User.updateOne(
//       { _id: notification.member },
//       { $pull: { notifications: notification._id } }
//     )
//     await Notification.deleteOne({ _id: req.params.id })
//     res.json("updated")
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// }

const deleteNotification = async (req, res) => {
  try {
    await Notification.deleteOne({ _id: req.params.id }).exec()
    res.json(true)
  } catch (err) {
    res.json({ error: err.message })
  }
}
const deleteAllNotification = async (req, res) => {
  try {
    await Notification.deleteAll({ member: req.params.id }).exec()
    res.json(true)
  } catch (err) {
    res.json({ error: err.message })
  }
}

module.exports = {
  deleteNotification,
  // updateNotification,
  // newNotification,
  deleteAllNotification,
  index,
  // show,
}
