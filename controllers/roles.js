const Role = require("../models/role.js")
const User = require("../models/user.js")
// const Role = require("../models/role.js")

const index = async (req, res) => {
  //done
  try {
    let roles = await Role.find({ team: req.params.id }).populate([
      {
        path: "team",
        model: "Team",
      },
    ])
    res.json(roles)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const show = async (req, res) => {
  // done
  try {
    const role = await Role.findById(req.params.id).populate("team")
    res.json(role)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// i am here right now

const newRole = async (req, res) => {
  //done
  try {
    const role = await Role.create(req.body)
    res.send("Role Created")
  } catch (err) {
    res.json({ error: err.message })
  }
}

const updateRole = async (req, res) => {
  try {
    // req.body.status = true
    let role = await Role.updateOne({ _id: req.params.id }, req.body)
    res.json(role)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const deleteRole = async (req, res) => {
  try {
    await Role.deleteOne({ _id: req.params.id }).exec()
    res.json(true)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const assignRole = async (req, res) => {
  try {
    const role = await Role.create(req.body)
    await User.updateOne({ _id: req.params.id }, { $push: { roles: role._id } })
    // res.json(true)
    res.json("role was assigned successfully")
  } catch (err) {
    res.json({ error: err.message })
  }
}
const removeRole = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { $pull: { roles: req.body } })
    res.json("roll/s was removed successfully")
  } catch (err) {
    res.json({ error: err.message })
  }
}
module.exports = {
  deleteRole,
  updateRole,
  removeRole,
  newRole,
  index,
  show,
  assignRole,
}
