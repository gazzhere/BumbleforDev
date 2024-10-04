const express = require("express");
const app = express();

//request handler
app.use("/test", (req, res) => {
  res.send("hellow");
});
app.use("/", (req, res) => {
  res.send("bla vla bla waazzup 🧑‍💻");
});

app.listen(3000, () => {
  console.log("server is listening on port no 3000");
});
