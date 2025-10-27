const express = require("express");
const router = express.Router();

const { getProfile } = require("./userController");
const { protect } = require("../../Middleware/authMiddleware");


router.get("/profile", protect, getProfile);

module.exports = router;
