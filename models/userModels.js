const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, "Please Fill Name!"]
    },
    email: {
        type: String,
        require: [true, "Please Fill Mail"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Please Fill Password"]
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    },
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("user", userSchema)