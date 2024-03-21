const User = require("../models/user")
const middleware = require("../middleware")

const signUp = async (req, res) => {
  try {
    const { email, password, name, avatar, phone } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      const user = await User.create({
        name,
        email,
        password: passwordDigest,
        phone,
        avatar,
      })
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(user.password, password)
    if (matched) {
      let payload = {
        // needs changes
        id: user.id,
        email: user.email,
        // role: user.role,
      }
      let token = middleware.createToken(payload)

      return res.send({ user: payload, token })
    }
    res.json({ error: "Your email and/or password do not match" })
    // res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: "Error", msg: "An Error has occurrd!" + error })
  }
}

const checkSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  signUp,
  signIn,
  checkSession,
}
