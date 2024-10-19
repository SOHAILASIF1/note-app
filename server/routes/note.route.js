import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { addNote, deleteNote, editNote, getData } from "../controllers/note.js";
// import { login, registerUser } from "../controllers/user.js";
const router=express.Router()
router.post('/add',isAuthenticated,addNote)
router.get('/',isAuthenticated,getData)
router.put('/:id',editNote)
router.delete('/:id',deleteNote)

export default router