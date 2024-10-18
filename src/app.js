const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use(cookieParser());
app.use(express.json());
process.loadEnvFile(".env");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
// data base connection
connectDb()
  .then(() => {
    // first connect to the database then only after connect to the server
    // highly important
    console.log("database connected sucessfully");
    app.listen(process.env.PORT, () => {
      console.log("server is listening on", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
