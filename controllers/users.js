const User = require('../models/user.js')

const newUser = async (req, res) => {
  try {
    let newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const getTeams = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('teams')
    const teams = user.teams
    res.send(teams)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { newUser, getTeams }
