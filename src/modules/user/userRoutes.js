const express = require("express");

const {
    registerUser,
    signinUser,
    logoutUser,
    getProfile,
} = require("./userController");
const { protect } = require("../../Middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", signinUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getProfile);

module.exports = router;
