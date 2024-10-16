// const database="mongodb+srv://TinderBackend:KHOzJoBBW1pSx3ID@tinderbackend.lx7xc.mongodb.net/"
const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://TinderBackend:KHOzJoBBW1pSx3ID@tinderbackend.lx7xc.mongodb.net/Devtinder"
  );
};

module.exports=connectDb;
