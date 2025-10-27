const express = require("express");
const { createNote, getNotes, getNoteById, updateNote, deleteNote, } = require("./noteController");

const router = express.Router();
const { protect } = require("../../Middleware/authMiddleware");
// /api/notes

router.route("/").get(protect, getNotes)
router.route("/").post(protect, createNote);

router.route("/:id").get(protect, getNoteById)
router.route("/:id").put(protect, updateNote)
router.route("/:id").delete(protect, deleteNote);

module.exports = router;
