const express = require("express");
const router = express.Router();
const { getMyTickets } = require("../controllers/checkinController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Attendee self-service ticket access
router.get("/my-tickets", authenticateUser, getMyTickets);

module.exports = router;
