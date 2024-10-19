import express from "express"
import DBConnection from "./db/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import npteRouter from "./routes/note.route.js";
const app=express()
DBConnection()
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // allow cookies to be sent
  }));
 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/note',npteRouter)
app.listen(4000,()=>{
    console.log("Server is Running");
})