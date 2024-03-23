const Team = require('../models/team.js')
const User = require('../models/user.js')
const Role = require('../models/role.js')

const createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body)
    const role = await Role.create({ name: 'Manager', team: team._id })
    const user = await User.findById(req.body.manager)
    user.teams.push(team._id)
    user.roles.push(role.id)
    user.save()
    res.send('Team Created')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createTeam }
