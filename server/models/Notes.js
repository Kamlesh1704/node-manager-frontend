import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now 
    }
  });

const Notes = mongoose.model("notes", NotesSchema);
export default Notes;