const Note = require("./noteModel");
 
const createNoteService = async ({ title, content, userId }) => {
    return await Note.create({ title, content, user: userId });
};
 
const getNotesService = async (userId) => {
    return await Note.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("user", "name email");
};
 
const getNoteByIdService = async (id, userId) => {
    return await Note.findOne({ _id: id, user: userId })
        .populate("user", "name email");
};


const updateNoteService = async (id, userId, updateData) => {
    const note = await Note.findOne({ _id: id, user: userId });
    if (!note) return null;

    note.title = updateData.title || note.title;
    note.content = updateData.content || note.content;
    return await note.save();
};


const deleteNoteService = async (id, userId) => {
    return await Note.findOneAndDelete({ _id: id, user: userId });
};

module.exports = {
    createNoteService,
    getNotesService,
    getNoteByIdService,
    updateNoteService,
    deleteNoteService,
};
