require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectdb = require("./config/db");
const routeUser = require("./routes/userRoute");

// Validate critical environment variables at startup
const requiredEnv = ["JWT_SECRET"];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);
const hasDbConfig = Boolean(process.env.db || process.env.MONGODB_URI);

if (missingEnv.length > 0 || !hasDbConfig) {
  const missing = [...missingEnv];
  if (!hasDbConfig) missing.push("db (or MONGODB_URI)");
  console.error(`[Startup Error] Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Hi there</h1>");
});

// User routes
app.use("/api/user", routeUser);

// Multi-Organization SaaS routes
app.use("/api/organizations", require("./routes/orgRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/invitations", require("./routes/invitationRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Global Error Handler - Prevents leaking stack traces or internal errors to clients
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({
    message: "An unexpected internal server error occurred.",
  });
});

// Start server only after database is successfully connected
const startServer = async () => {
  try {
    await connectdb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server due to database connection error:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;