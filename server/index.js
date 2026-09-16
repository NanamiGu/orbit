const express = require("express");
const cors = require("cors");

const connectdb = require("./config/db");
const routeUser = require("./routes/userRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database
connectdb();

// Test route
app.get("/", (req, res) => {
    res.send("<h1>Hi there</h1>");
});

// User routes
app.use("/api/user", routeUser);

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});