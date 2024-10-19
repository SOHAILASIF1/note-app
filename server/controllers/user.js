import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const registerUser=async (req,res)=>{
   try {
     const {name,email,password}=req.body
     const user=await User.findOne({email})
     if (user) {
        return res.status(401).json({success:false,message:"User already exist"})
         
     }
     const hashedPassword=await bcrypt.hash(password,10)
     const newUser=new User({
         name,email,password:hashedPassword
     })
     await newUser.save()
     return  res.status(200).json({success:true,message:"User created"})
 
   } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Error",error})
    
   }
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if (!user) {
           return res.status(401).json({
            status:false,
            message:"User not exist"

           })
            
        }
        const isMatched = await bcrypt.compare(password, user.password);
         if (!isMatched) {
            return res.status(402).json({
                status:false,
                message:"invalid Password"
    
               })
            
         }
         const token = jwt.sign({ _id: user._id }, "ALi", { algorithm: 'HS256' });
         const options={expires:new Date(Date.now()+100*24*60*60*1000),httpOnly:true}
         res.status(201).cookie('token',token,options).json({
             success:true,
             user:{
                 _id:user._id,
                 name:user.name,
                 email:user.email
             },
             token
         })

    } catch (error) {
        console.log(error);
    res.status(500).json({succses:false,message:"Error",error})
        
    }
}
export const verifyUser=async(req,res)=>{
    try {
        return res.status(200).json({
            success:true,
            message:"Verified",
            user:req.user
            
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:" not Verified",
           
            
        })
        
    }
}