const express = require('express');
const { isAuthorized } = require('../middleware/adminMiddleware');
const { getAllUser, getadminTickets, getadminTicket } = require('../controllers/adminController');

const router = express.Router()

router.get('/users', isAuthorized, getAllUser)
router.get('/tickets', isAuthorized, getadminTickets)
router.get('/tickets/:id', isAuthorized, getadminTicket)

module.exports = router

