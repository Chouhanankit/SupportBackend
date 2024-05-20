const express = require('express');
const { connectDB } = require('./config/db.config');
const { errorHandler } = require('./middleware/errorHandler');
require('dotenv').config();
const cors = require('cors')

const app = express();

// DB Connection
connectDB()

const PORT = process.env.PORT || 4000;

app.use(cors())

// Body Parse
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Entry Point
app.get("/", (req, res) => {
    res.send("WELCOME TO SUPPORT DESK APP")
})

// Routes
app.use('/api/user', require('./routes/userRoutes'))

// Admin Routes
app.use('/api/admin', require('./routes/adminRoutes'))

// Ticket
app.use('/api/ticket', require("./routes/ticketRoutes"))

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running PORT: ${PORT}`)
})

