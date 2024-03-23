const User = require("../models/user")
const Role = require("../models/role")
const Ticket = require("../models/ticket")
const Team = require("../models/team")
const Invite = require("../models/invite")
const Notification = require("../models/notification")

const index = async (req, res) => {
  //done
  try {
    let users = await User.find()
    res.json(users)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const show = async (req, res) => {
  // done
  try {
    // const user = await User.findById(req.params.id).populate([
    //   "tickets",
    //   "stadiums",
    // ])
    // let aloi = user.tickets.map((ticket) => ticket.populate(["match"]))

    // how to populate
    // .populate({
    //   path: "tickets",
    //   populate: {
    //     path: "match",
    //     model: "Match",
    //   },
    // })
    // .populate("stadiums")

    // const user = await User.findById(req.params.id)
    //   .populate({
    //     path: "roles",
    //     populate: {
    //       path: "team",
    //       model: "Team",
    //     },
    //   })
    //   .populate({
    //     path: "tickets",
    //     populate: [
    //       {
    //         path: "member",
    //         model: "User",
    //       },
    //       {
    //         path: "createdBy",
    //         model: "User",
    //       },
    //       {
    //         path: "solvedBy",
    //         model: "User",
    //       },
    //     ],
    //   })
    //   .populate({
    //     path: "teams",
    //     populate: [
    //       {
    //         path: "manager",
    //         model: "User",
    //       },
    //       {
    //         path: "members",
    //         model: "User",
    //       },
    //     ],
    //   })
    //   .populate({
    //     path: "invitions",
    //     populate: [
    //       {
    //         path: "sender",
    //         model: "User",
    //       },
    //       {
    //         path: "member",
    //         model: "User",
    //       },
    //       {
    //         path: "team",
    //         model: "Team",
    //       },
    //     ],
    //   })
    //   .populate({
    //     path: "notifications",
    //     populate: [
    //       {
    //         path: "member",
    //         model: "User",
    //       },
    //       {
    //         path: "ticket",
    //         model: "Ticket",
    //       },
    //     ],
    //   })
    //   .exec();

    const user = await User.findById(req.params.id)
      .populate([
        {
          path: "roles",
          populate: {
            path: "team",
            model: "Team",
          },
        },
        {
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
        },
        {
          path: "teams",
          populate: [
            {
              path: "manager",
              model: "User",
            },
            {
              path: "members",
              model: "User",
            },
          ],
        },
        {
          path: "invitions",
          populate: [
            {
              path: "sender",
              model: "User",
            },
            {
              path: "member",
              model: "User",
            },
            {
              path: "team",
              model: "Team",
            },
          ],
        },
        {
          path: "notifications",
          populate: [
            {
              path: "member",
              model: "User",
            },
            {
              path: "ticket",
              model: "Ticket",
            },
          ],
        },
      ])
      .exec()

    res.json(user)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// const newUser = async (req, res) => {
//   //done
//   try {
//     let newUser = await User.create(req.body);
//     res.json(newUser);
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// };

const updateUser = async (req, res) => {
  try {
    let user = await User.updateOne({ _id: req.params.id }, req.body)
    res.json(user)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id }).exec()
    res.json(true)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const getTeams = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("teams")
    const teams = user.teams
    res.send(teams)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  deleteUser,
  updateUser,
  // newUser,
  index,
  show,
  getTeams,
}
