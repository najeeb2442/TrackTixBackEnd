var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const cors = require("cors")
require("./config/database")
const port = 3000

const upload = require("./middleware/upload")

/// Creating Routes
var indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const AuthRouter = require("./routes/Auth")
const ticketsRouter = require("./routes/tickets")
const teamsRouter = require("./routes/teams")
const rolesRouter = require("./routes/roles")
const notificationsRouter = require("./routes/notifications")
const invitesRouter = require("./routes/invites")

var app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(cors())

// Set up a route for file uploads
app.post("/upload", upload.array("file"), (req, res) => {
  // console.log(req.file)
  // console.log(req.body.file)
  console.log(req.files)

  // Handle the uploaded file
  res.json({ message: "File uploaded successfully!" })
})

app.get(
  "/download/:file",

  // Route handler for /api/files/testfile
  async (req, res, next) => {
    // File
    const fileName = req.params.file
    // const filePath = path.join(__dirname, "./public/images/", fileName)
    const filePath = path.join("./public/data/uploads/", fileName)

    // File options
    const options = {
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
        // "content-disposition": "attachment; filename=" + fileName, // gets ignored
        "Content-Type": "multipart/form-data",
        // "content-type": "text/csv",
      },
    }

    try {
      res.download(filePath, fileName, options)
      console.log("File sent successfully!")
    } catch (error) {
      console.error("File could not be sent!")
      next(error)
    }
  }

  // (req, res) => {
  //   // Handle the uploaded file
  //   res.json({ message: "File uploaded successfully!" })
  // }
)

// the routes

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/auth", AuthRouter)
app.use("/tickets", ticketsRouter)
app.use("/teams", teamsRouter)
app.use("/roles", rolesRouter)
app.use("/notifications", notificationsRouter)
app.use("/invites", invitesRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app
