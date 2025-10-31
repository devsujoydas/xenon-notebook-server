const express = require("express");
const router = express.Router();
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require("./noteController");

router.route("/")
    .get(getNotes)
    .post(createNote);

router.route("/:id")
    .get(getNoteById)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;
