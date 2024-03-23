var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
require('./config/database')
// const port = 3000

/// Creating Routes
var indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const AuthRouter = require('./routes/Auth')
const ticketsRouter = require('./routes/tickets')
const teamsRouter = require('./routes/teams')
// const rolesRouter = require("./routes/roles");
// const notificationsRouter = require("./routes/notifications");
const invitesRouter = require('./routes/invites')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

// the routes

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', AuthRouter)
app.use('/tickets', ticketsRouter)
app.use('/teams', teamsRouter)
// app.use("/roles", rolesRouter);
// app.use("/notificaions", notificationsRouter);
app.use('/invites', invitesRouter)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app
