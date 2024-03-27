const Team = require("../models/team")
const User = require("../models/user")
const Role = require("../models/role.js")
const Ticket = require("../models/ticket.js")
// const team = require("../models/team")
const cloudinary = require("../utils/cloudinary")

const index = async (req, res) => {
  //done
  try {
    //   .populate(["member", "createdBy", "solvedBy"]);

    let teams = await Team.find({ _id: req.params.id }).populate([
      {
        path: "manager",
        model: "User",
      },
      {
        path: "members",
        model: "User",
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
    ])
    res.json(teams)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const show = async (req, res) => {
  // done
  try {
    const team = await Team.findById(req.params.id)
      .populate(["manager"])
      .populate({
        path: "members",
        populate: {
          path: "roles",
          populate: {
            path: "team",
          },
        },
      })

    res.json(team)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// i am here right now

const newTeam = async (req, res) => {
  //done
  try {
    console.log(req.body)
    // console.log(req.files)
    console.log(req.file)
    const result = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "avatar", height: 200, width: 200, crop: "fill" },
      function (error, result) {
        console.log("result")
        console.log(result)
        console.log("error")
        console.log(error)
      }
    )

    const team = await Team.create({ ...req.body, avatar: result.url })
    const role = await Role.create({ name: "Manager", team: team._id })
    const user = await User.findById(req.body.manager)
    user.teams.push(team._id)
    user.roles.push(role.id)
    team.members.push(req.body.manager)
    team.save()
    user.save()
    res.send("Team Created")

    const fs = require("fs")

    console.log(req.file.filename)

    // Asynchronously delete a file
    fs.unlink(`./public/data/uploads/${req.file.filename}`, (err) => {
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

    // let newTeam = await Team.create(req.body)
    // await User.updateOne(
    //   { _id: req.body.manager },
    //   { $push: { teams: newTeam._id } }
    // )
    // newTeam = await Team.updateOne({ _id: newTeam._id })

    // res.json(newTeam)
  } catch (err) {
    console.log(err.message)
    res.json({ error: err.message })
  }
}

const updateTeam = async (req, res) => {
  try {
    // req.body.status = true
    let team = await Team.updateOne({ _id: req.params.id }, req.body)
    team = await Team.updateOne({ _id: req.params.id }, { logs: req.body })

    res.json(team)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const deleteTeam = async (req, res) => {
  try {
    // if (res.locals.payload) {
    //   if (
    //     res.locals.payload.role == "Admin" ||
    //     res.locals.payload.role == "customer"
    //   ) {
    //   }
    // }
    await Team.deleteOne({ _id: req.params.id }).exec()
    res.json(true)
  } catch (err) {
    res.json({ error: err.message })
  }
}

//   "/:id/removeroles/:userId,",
const removeAllRoles = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      "roles"
    )

    let userRoles = []
    user.roles.forEach((element) => {
      if (element.team.equals(req.params.id)) {
        userRoles.push(element._id)
      }
    })

    await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { roles: { $in: userRoles } } }
    )
    await Role.deleteMany({ _id: { $in: userRoles } }).exec()

    res.json(true)
  } catch (err) {
    console.log(err.message)
    res.json({ error: err.message })
  }
}

// "/:teamId/removemember/:userId",
// removeMember
const removeMember = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })

    const team = await Team.findOneAndUpdate(
      { _id: req.params.teamId },
      { $pull: { members: req.params.userId } }
    )

    await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $pull: { teams: req.params.teamId, tickets: { $in: team.tickets } },
      }
    )

    await Ticket.updateMany(
      { _id: { $in: team.tickets } },
      {
        $pull: { member: req.params.userId },
      }
    )

    // if (condition) {
    await Ticket.updateMany(
      {
        $and: [
          { _id: { $in: team.tickets } },
          { member: { $size: 0 } },
          { status: { $not: { status: "Complete" } } },
        ],
      },
      {
        $set: { status: "Pending" },
      }
    )
    // }

    // pictures: { $exists: true, $not: {$size: 0} }

    // $set: { tickets: [] },
    // {$in: myItemsArray}}

    // await User.findOneAndUpdate({
    //   _id: req.params.userId,
    //   tickets: { $in: team.tickets },
    // })

    await Role.deleteMany(
      { _id: { $in: user.roles } }
      // { $pull: { members: req.params.userId } }
    )

    // if (user.tickets.length != 0) {
    //   await Ticket.updateMany(
    //     { member: req.params.userId },
    //     { $pull: { members: req.params.userId } }
    //   )
    // }

    // else {

    // {
    //   _id: req.params.teamId,
    //   members: {
    //     $elemMatch: req.params.userId,
    //   },
    // },
    // )
    // }
    res.json(true)
  } catch (err) {
    res.json({ error: err.message })
  }
}

module.exports = {
  deleteTeam,
  updateTeam,
  newTeam,
  index,
  show,
  removeAllRoles,
  removeMember,
}
