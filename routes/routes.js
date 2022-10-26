const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/model");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  //   console.log("From Register");
  const userReq = {
    username: req.body.username,
    fullname: req.body.fullname,
    emailId: req.body.emailId,
    password: req.body.password,
  };
  const user = await UserModel.create(userReq);
  res.json(user);
});

module.exports = router;
