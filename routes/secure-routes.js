const express = require("express");
const router = express.Router();

router.get("/profile", (req, res, next) => {
  // console.log("From Profile..! ");
  res.json(req.user);
});

module.exports = router;
