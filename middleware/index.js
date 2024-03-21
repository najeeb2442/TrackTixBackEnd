const { hash, compare } = require("bcryptjs")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECERT = process.env.APP_SECERT

const hashPassword = async (password) => {
  let hashedPassword = await hash(password, SALT_ROUNDS)
  return hashedPassword
}

const comparePassword = async (storedPassword, password) => {
  let passwordMatch = await compare(password, storedPassword)
  return passwordMatch
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECERT)
  return token
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals

  try {
    let payload = jwt.verify(token, APP_SECERT)
    if (payload) {
      res.locals.payload = payload
      return next()
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "Verify Token Error!" })
  }
}

const stripToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]

    if (token) {
      res.locals.token = token
      return next()
    }
    res.send(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log("Error")
    res.status(401).send({ status: "Error", msg: "STrip Token Error!" })
  }
}

module.exports = {
  stripToken,
  verifyToken,
  createToken,
  hashPassword,
  comparePassword,
}
