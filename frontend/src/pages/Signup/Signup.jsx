import React, { useState } from 'react'
import './Signup.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function Signup() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
       try {
         e.preventDefault()
         const res=await axios.post("http://localhost:4000/api/auth/register",{name,email,password})
         if (res.data.success) {
          toast.success("Signup Succesful")

          navigate('/login')
          
         }
       }catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message)  // Correct way to access error message
        } else {
            toast.error("Something went wrong. Please try again.")
        }
        console.log(error)
    }
        
    
    }
    

  return (
    <div className='container'>

        <div className='signup'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div className='sign-box'>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}  />
            </div>
            <div className='sign-box'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}  />
            </div>
            <div className='sign-box'>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='********' onChange={(e)=>setPassword(e.target.value)}  />
            </div>
            <input type="submit" className='button' />
            <button onClick={()=>navigate('/')} className=' button'> Back </button>

            </form>
        </div>

    </div>
  )
}

export default Signup