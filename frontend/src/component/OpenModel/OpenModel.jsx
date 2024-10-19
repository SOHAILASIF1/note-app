import React, { useEffect, useState } from 'react'
import '../../pages/Signup/Signup.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function OpenModel({closeModel,addNote,currentNote,editNote}) {
    const [tittle,setTittle]=useState("")
    const [dics,setDics]=useState("")

   
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (currentNote && currentNote._id) {
        // Only proceed if currentNote and _id are defined
        editNote({ id: currentNote._id, tittle, dics });
      } else {
        addNote({ tittle, dics });
      }
    };
    
    useEffect(()=>{
    if (currentNote) {
      setTittle(currentNote.tittle)
      console.log(currentNote);
      setDics(currentNote.dics)
      
    }
    },[currentNote])
    

  return (
    <div className='container'>

        <div className='signup'>
            <h1>{currentNote?"Edit Note":"Add Note"}</h1>
            <form onSubmit={handleSubmit}>
            <div className='sign-box'>
                <label htmlFor="name">Title</label>
                <input value={tittle} type="text" placeholder='Title' onChange={(e)=>setTittle(e.target.value)}  />
            </div>
            <div className='sign-box'>
                <label htmlFor="email">Discription</label>
                <textarea value={dics} cols='30' rows='10'  onChange={(e)=>setDics(e.target.value)}/> 
            </div>
            
            <input type="submit" className='button' />
            <button  onClick={closeModel} className='close'>Cancel</button>
            </form>
        </div>

    </div>
  )
}

export default OpenModel