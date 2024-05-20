const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    product: {
        type: String,
        require: [true, "Please Select Product"],
        enum: ["iPhone", "iPad", "iMac", "Mackbook"]
    },
    description: {
        type: String,
        require: [true, "Please Enter the Description of issue"]
    },
    status: {
        type: String,
        require: true,
        enum: ["new", "open", "closed"],
        default: "new"
    },
}, {
    timestamps: true,
}
)

module.exports = mongoose.model("Ticket", ticketSchema)