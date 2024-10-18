const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/Auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("login again");
  }
});

module.exports = profileRouter;
