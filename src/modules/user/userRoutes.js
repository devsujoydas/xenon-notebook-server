const express = require("express");
const router = express.Router();

const { getProfile } = require("./userController"); 


router.get("/profile", getProfile);
 
module.exports = router;
