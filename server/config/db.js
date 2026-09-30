require("dotenv").config();
const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        const connectionString = process.env.db?.trim();

        if (!connectionString?.startsWith("mongodb://") && !connectionString?.startsWith("mongodb+srv://")) {
            throw new Error("The db environment variable must start with mongodb:// or mongodb+srv://");
        }

        await mongoose.connect(connectionString);
        console.log("connect");
    } catch (error) {
        console.log("don't connect", error);
    }
};

module.exports = dbconnect;