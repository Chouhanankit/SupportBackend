const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createTicket, getTickets, getTicket, deleteTicket, upadateTicket } = require("../controllers/ticketControllers");

const router = express.Router();

router.route("/").post(protect, createTicket).get(protect, getTickets)
router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, upadateTicket)

module.exports = router;