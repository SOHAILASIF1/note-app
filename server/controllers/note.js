import Note from "../models/note.model.js";
export const addNote = async (req, res) => {
  try {
    console.log(req.user);  // Check if req.user is defined
    
    const { tittle, dics } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const newNote = new Note({
      tittle,
      dics,
      userId: req.user.id,
    });
    await newNote.save();

    return res.status(200).json({
      success: true,
      message: "Note Created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Note Creation",
    });
  }
};

    export const getData=async(req,res)=>{
        try {
            const notes=await Note.find({userId:req.user.id})
            return res.status(200).json({
                success:true,
                message:"ok",
                notes
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"cant retrive"

            })
            
        }
    }
    export const editNote = async (req, res) => {
        try {
          const { id } = req.params; // Ensure the 'id' is being captured correctly
          if (!id) {
            return res.status(400).json({
              success: false,
              message: "Invalid note ID",
            });
          }
          
          const updateNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
          if (!updateNote) {
            return res.status(404).json({
              success: false,
              message: "Note not found",
            });
          }
      
          return res.status(200).json({
            success: true,
            message: "Note updated",
            updateNote,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Error updating note",
          });
        }
      };
      
      export const deleteNote = async (req, res) => {
        try {
          const { id } = req.params; // Ensure the 'id' is being captured correctly
          if (!id) {
            return res.status(400).json({
              success: false,
              message: "Invalid note ID",
            });
          }
          
          const updateNote = await Note.findByIdAndDelete(id);
          
      
          return res.status(200).json({
            success: true,
            message: "Note updated",
            updateNote,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Error deleting note",
          });
        }
      };
      