import React from 'react'
import './NoteCard.css'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function NoteCard({note,onEdit,deleteNote}) {
  return (
    <div className='notecard'>
        <h2>{note.tittle}</h2>
        <p>{note.dics}</p>
        <div className='notecard-button'>
            <button onClick={()=>onEdit(note)}>
                <FaEdit/>

            </button>
            <button onClick={()=>deleteNote(note._id)}>
                <MdDeleteOutline/>

            </button>
            
        </div>
        
    </div>
  )
}

export default NoteCard