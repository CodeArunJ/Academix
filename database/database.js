const mongoose = require("mongoose");

const connectDB = async () => {
  try {
  await mongoose.connect("mongodb://localhost:27017/academixDB");
    console.log("✅ MongoDB Connected Successfully (Localhost)");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
