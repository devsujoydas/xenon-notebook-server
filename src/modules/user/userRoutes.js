const express = require("express");
const router = express.Router();

const { getProfile, getUserAddress, updateUserAddress, updateUserProfile } = require("./userController");
const isVerifyUser = require("../../Middleware/isVerifyUser");


router.get("/profile", isVerifyUser, getProfile);
router.put("/profile", isVerifyUser, updateUserProfile);
router.put("/address", isVerifyUser, updateUserAddress);

module.exports = router;
