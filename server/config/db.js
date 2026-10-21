require("dotenv").config();
const mongoose = require("mongoose");

const dbconnect = async () => {
  const connectionString = (process.env.MONGODB_URI || process.env.db)?.trim();

  if (!connectionString) {
    throw new Error("Database connection string is missing. Please set 'db' or 'MONGODB_URI' in environment variables.");
  }

  if (!connectionString.startsWith("mongodb://") && !connectionString.startsWith("mongodb+srv://")) {
    throw new Error("The db environment variable must start with mongodb:// or mongodb+srv://");
  }

  await mongoose.connect(connectionString);
  console.log("Connected to MongoDB successfully");
};

module.exports = dbconnect;