const express = require("express");
const { refreshAccessToken, signUpUser, signInUser, logOutUser } = require("./authController");
const router = express.Router();


router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/logout", logOutUser);

router.get("/refresh", refreshAccessToken)

module.exports = router