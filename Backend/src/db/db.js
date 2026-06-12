const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB connected!! DB:host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Error while connecting to DB : ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
