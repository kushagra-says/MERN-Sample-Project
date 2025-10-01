import Note from '../Models/Note.js ';

export async function getAllNotes(_, res){
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Note not found" });
    }
    console.error("Error in getNoteById", error);
    res.status(500).json({ message: "Error fetching note", error });
  }
};

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote", error);
    res.status(500).json({ message: "Error creating note", error });
  }
};

export async function updateNote(req, res) {
  try {
    const {title,content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content} ,{new:true});
    if(!updatedNote){
      return res.status(404).json({message:"Note not found"});
    }
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Note not found" });
    }
    console.error("Error in updateNote", error);
    res.status(500).json({ message: "Error updating note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote", error);
    res.status(500).json({ message: "Error deleting note", error });
  }
};
