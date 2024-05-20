const express = require("express");
const { userRegister, userLogin, getMe } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post('/', userRegister)
router.post("/login", userLogin)
router.get('/protect', protect, getMe)

module.exports = router;