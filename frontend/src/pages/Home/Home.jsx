import React, { useState, useEffect } from 'react';
import "./Home.css";
import Navbar from '../../component/Navbar/Navbar';
import OpenModel from '../../component/OpenModel/OpenModel';
import axios from 'axios';
import NoteCard from '../../component/NoteCard/NoteCard';
import { toast } from 'react-toastify';

function Home() {
  const [openModel, setOpenModel] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const addNewNote = () => {
    setCurrentNote(null);
    setOpenModel(true);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get("http://localhost:4000/api/note", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModel = () => setOpenModel(false);

  const onEdit = (note) => {
    setCurrentNote(note);
    setOpenModel(true);
  };

  const addNote = async ({ tittle, dics }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:4000/api/note/add", { tittle, dics }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        closeModel();
        toast.success('Add Successful');
        fetchData();
      }
    } catch (error) {
      console.error("Error adding note:", error.response ? error.response.data.message : error.message);
    }
  };

  const editNote = async ({ id, tittle, dics }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:4000/api/note/${id}`, { tittle, dics }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        closeModel();
        toast.success('Updated Successful');
        fetchData();
      }
    } catch (error) {
      console.error("Error updating note:", error.response ? error.response.data.message : error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:4000/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting note:", error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className='home'>
        {!openModel && (
          <div className='notes'>
            {notes.length === 0 ? (
              <div className='no-notes-message'>
                <h2>No notes yet!</h2>
                <p>Click the "+" button to add your first note.</p>
              </div>
            ) : (
              notes.map((note) => (
                <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNote={deleteNote} />
              ))
            )}
          </div>
        )}
        <button onClick={addNewNote} className='button-home'>
          +
        </button>
        {openModel && <OpenModel closeModel={closeModel} addNote={addNote} currentNote={currentNote} editNote={editNote} />}
      </div>
    </>
  );
}

export default Home;
