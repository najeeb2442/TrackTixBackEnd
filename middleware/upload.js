const multer = require("multer")

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/uploads/")
    // cb(null, "../uploads/")
    // cb(null, "./public/images/")
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "-" +
        file.originalname
    )
  },
})

// Create the multer instance
const upload = multer({ storage: storage })

module.exports = upload
