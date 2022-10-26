const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require("../model/model");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const userReq = {
    username: req.body.username,
    fullname: req.body.fullname,
    emailId: req.body.emailId,
    password: req.body.password,
  };
  const user = await UserModel.create(userReq);
  res.json(user);
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        if (err && err.code === "USER_NOT_FOUND") {
          return res.status(404).send(err);
        }
        const error = new Error("An error occured.");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {
          //   _id: user.id,
          username: user.username,
          emailId: user.emailId,
          fullname: user.fullname,
        };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
