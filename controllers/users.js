const User = require("../models/user.js")

const newUser = async (req, res) => {
  //done
  try {
    let newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err) {
    res.json({ error: err.message })
  }
}

module.exports = { newUser }
