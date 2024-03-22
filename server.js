var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("./config/database");
const port = 3000;

/// Creating Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const AuthRouter = require("./routes/Auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// the routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
