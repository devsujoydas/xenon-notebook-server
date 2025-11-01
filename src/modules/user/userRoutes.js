const express = require("express");
const router = express.Router();

const { getProfile } = require("./userController"); 
const isVerifyUser = require("../../Middleware/verifyUser");


router.get("/profile",isVerifyUser, getProfile);
 
module.exports = router;
