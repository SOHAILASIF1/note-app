import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end of the string
  },
  dics: {
    type: String,
    required: true,
   
    trim: true,
    
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
