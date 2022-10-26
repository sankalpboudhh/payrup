const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");

const UserModel = require("./model/model");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/PayRup"
);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
