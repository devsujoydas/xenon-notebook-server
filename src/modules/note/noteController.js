const Note = require("./noteModel")

const createNote = async (req, res) => {

    const { title, content } = req.body;
    try {
        const note = await Note.create({ title, content, user: req.userId });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 }).populate("user", "name email")  ;
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.userId }).populate("user", "name email");
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.userId });
        if (!note) return res.status(404).json({ message: "Note not found" });

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        await note.save();

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote }