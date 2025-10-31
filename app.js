const express = require("express")
const router = express.Router()
const authRoutes = require("./src/modules/auth/authRoutes");
const noteRoutes = require("./src/modules/note/noteRoutes");
const userRoutes = require("./src/modules/user/userRoutes");


router.use("/auth", authRoutes)
router.use("/notes", noteRoutes);
router.use("/users", userRoutes);


module.exports = router