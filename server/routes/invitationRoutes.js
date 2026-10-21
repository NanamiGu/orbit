const express = require("express");
const router = express.Router();
const { acceptInvitation } = require("../controllers/orgController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Accept invitation requires authenticated user
router.post("/accept", authenticateUser, acceptInvitation);

module.exports = router;
