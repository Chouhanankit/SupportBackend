const asyncHandler = require('express-async-handler');
const User = require('../models/userModels')
const Ticket = require('../models/ticketModel')


const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").select("-isAdmin");
    if (!users) {
        res.status(404)
        throw new Error("User is Not Found")
    }
    res.status(200).json(users)
})

const getadminTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find()
    if (!tickets) {
        res.status(404)
        throw new Error("Ticket is Not Found")
    }
    res.status(200).json(tickets)
})


const getadminTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket Not Found")
    }
    res.status(200).json(ticket)
})

module.exports = { getAllUser, getadminTickets, getadminTicket }