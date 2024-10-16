const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middleware/Auth");

app.use(cookieParser());
app.use(express.json());

// create user
app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // encryption of passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //creating the new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).send("user added sucessfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("login again");
  }
});

// login api
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("invalid EmailId");
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("invalid credential ");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "helloganesh", {
        expiresIn: "1h",
      });

      res.cookie("token", token);
      res.send("Login sucessfull!!!!!!!");
    } else {
      res.status(200).send("invalid password " + "🧑‍💻");
    }
  } catch (err) {
    res.status(404).send("login failed " + err.message);
  }
});

// get user by email id
app.get("/users", async (req, res) => {
  try {
    const email = req.body.emailId;
    const userData = await User.find({ emailId: email });
    res.send(userData);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", (req, res) => {
  try {
    res.status(200).send("all user fetched succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//delete specific user by given id
app.delete("/user", async (req, res) => {
  try {
    const userid = req.body.userId;
    const user = await User.findByIdAndDelete(userid);
    res.status(200).send("User deleted sucesfully");
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

// update data in database
app.patch("/user/:userid", async (req, res) => {
  try {
    const userId = req.params?.userid;
    const data = req.body;
    const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];
    // this below function will return boolean
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update is not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated sucessfully");
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
});

app.post("/sendingConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " sent a connnection request");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// database connection
connectDb()
  .then(() => {
    // first connect to the database then only after connect to the server
    // highly important
    console.log("database connected sucessfully");
    app.listen(7777, () => {
      console.log("server is listening on 7777");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
