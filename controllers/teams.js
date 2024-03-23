const Team = require("../models/team")
const User = require("../models/user")
const Role = require("../models/role.js")

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
    ])
    res.json(teams)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const show = async (req, res) => {
  // done
  try {
    const team = await Team.findById(req.params.id).populate([
      "manager",
      "members",
    ])

    res.json(team)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// i am here right now

const newTeam = async (req, res) => {
  //done
  try {
    const team = await Team.create(req.body)
    const role = await Role.create({ name: "Manager", team: team._id })
    const user = await User.findById(req.body.manager)
    user.teams.push(team._id)
    user.roles.push(role.id)
    team.members.push(req.body.manager)
    team.save()
    user.save()
    res.send("Team Created")

    // let newTeam = await Team.create(req.body)
    // await User.updateOne(
    //   { _id: req.body.manager },
    //   { $push: { teams: newTeam._id } }
    // )
    // newTeam = await Team.updateOne({ _id: newTeam._id })

    // res.json(newTeam)
  } catch (err) {
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

module.exports = {
  deleteTeam,
  updateTeam,
  newTeam,
  index,
  show,
}
