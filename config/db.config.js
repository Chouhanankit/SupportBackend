const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB Connection Successfull :${conn.connection.host}`)
    } catch (error) {
        console.log(`Connect Failed`)
    }
}

module.exports = { connectDB }