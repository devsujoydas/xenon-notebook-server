const {
    createNoteService,
    getNotesService,
    getNoteByIdService,
    updateNoteService,
    deleteNoteService,
} = require("./noteServices");

const createNote = async (req, res) => {
    try {
        const note = await createNoteService({
            title: req.body.title,
            content: req.body.content,
            userId: req.userId,
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await getNotesService(req.userId);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await getNoteByIdService(req.params.id, req.userId);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await updateNoteService(req.params.id, req.userId, req.body);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await deleteNoteService(req.params.id, req.userId);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };
