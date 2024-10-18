const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/Auth");

requestRouter.post("/sendingConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " sent a connnection request");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = requestRouter;
