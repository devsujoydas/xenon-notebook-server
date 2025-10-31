const express = require("express");
const router = express.Router();

const authRoutes = require("./src/modules/auth/authRoutes");
const passRoutes = require("./src/modules/password/passRoutes");
const userRoutes = require("./src/modules/user/userRoutes");
const noteRoutes = require("./src/modules/note/noteRoutes");


router.use("/auth", authRoutes);
router.use("/password", passRoutes);
router.use("/users", userRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
