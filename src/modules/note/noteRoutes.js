const express = require("express");
const router = express.Router();
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require("./noteController");
const isVerifyUser = require("../../Middleware/verifyUser");


router.get("/", isVerifyUser, getNotes)
router.post("/", isVerifyUser, createNote)

router.get("/:id", isVerifyUser, getNoteById)
router.put("/:id", isVerifyUser, updateNote)
router.delete("/:id", isVerifyUser, deleteNote)


module.exports = router;
