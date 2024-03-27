const cloudinary = require("cloudinary").v2
require("dotenv").config()
// mongoose.connect(process.env.VITE_MONGODB_URL)

// import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
})

module.exports = cloudinary
