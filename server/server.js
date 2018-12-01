//Imports of externals scripts
require("./config/config");
require("colors");

//Imports of libraries and frameworks
const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

//Routes
const users = require("./routes/api/users");
const projects = require("./routes/api/projects");

//server configuration
let server = http.createServer(app);
let publicPath = path.resolve(__dirname, "../public");

//middlewares
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes middlewares
app.use("/api/users", users);
app.use("/api/projects", projects);

//Passport configuration
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose.connect(
  process.env.MONGOURI,
  err => {
    if (err) throw new Error("Error making the database connection".red);

    console.log(`mLab Database online`.green);
  }
);

server.listen(process.env.PORT, err => {
  if (err) throw new Error("Error making the server connection".red);

  console.log(`Server running in port 3000`.yellow);
});
