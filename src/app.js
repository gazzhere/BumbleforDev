const express = require("express");
const app = express();

app.use(
  "/user",
 [(req, res, next) => {
    console.log("handelling the rought user");

    next();
  },
  (req, res, next) => {
    console.log("handler 2");
    next();
  },
  (req, res, next) => {
    // res.send("second route handler");
    console.log("handler 3");
    next();
  },
  (req, res, next) => {
    console.log("handler 4");
    // res.send("second route handler");

    next();
  },
  (req, res, next) => {
    // res.send("second route handler");
    console.log("handler 5");
    res.send("last  amigo");
    // next();
  }]
);

app.listen(3000, () => {
  console.log("server is listening on port no 3000");
});
