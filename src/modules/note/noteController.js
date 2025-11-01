const {
    createNoteService,
    getNotesService,
    getNoteByIdService,
    updateNoteService,
    deleteNoteService,
} = require("./noteServices");

const createNote = async (req, res) => {
    const { title, content } = req.body
    try {
        const note = await createNoteService({ title, content, userId: req.user._id, });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await getNotesService(req.user._id);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await getNoteByIdService(req.params.id, req.user._id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {   
        const note = await updateNoteService(req.params.id, req.user._id, req.body);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await deleteNoteService(req.params.id, req.user._id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };
