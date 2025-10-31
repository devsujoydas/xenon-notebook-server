const express = require("express")
const router = express.Router()
const authRoutes = require("./src/modules/auth/authRoutes");
const userRoutes = require("./src/modules/user/userRoutes");
const noteRoutes = require("./src/modules/note/noteRoutes");


router.use("/auth", authRoutes)
router.use("/users", userRoutes);
router.use("/note", noteRoutes);


module.exports = router