const express = require("express");
const router = express.Router();

const { getProfile } = require("./userController"); 
const isVerifyUser = require("../../Middleware/isVerifyUser");


router.get("/profile",isVerifyUser, getProfile);
 
module.exports = router;
