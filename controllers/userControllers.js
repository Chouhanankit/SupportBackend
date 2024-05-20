const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const userRegister = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Fill All Details")
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
        res.status(409);
        throw new Error("User is Already exist!!")
    }

    // Create Bcript Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashPassword,
    })

    if (user) {
        res.status(201)
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
})

const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!email || !password) {
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200)
        user.isAdmin ? (
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                isAdmin: true,
            })
        ) : (
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        )
    } else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }

})


const getMe = asyncHandler(async (req, res) => {
    res.json(req.user)
})


// Generate Token
const generateToken = (id) => {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    return token;
}


module.exports = { userRegister, userLogin, getMe }