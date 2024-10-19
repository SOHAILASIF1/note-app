import express from "express";
import { login, registerUser, verifyUser } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router=express.Router()
router.post("/register",registerUser)
router.post("/login",login)
router.get('/verify',isAuthenticated,verifyUser)
export default router