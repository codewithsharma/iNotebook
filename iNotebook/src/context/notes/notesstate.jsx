import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  
  const notesInitial = [];
  let authToken = JSON.parse(localStorage.getItem('authToken'))


  let getToken = () =>{
    return authToken.token
  }

  const [notes, setNotes] = useState(notesInitial);
  // Get All Notes From API
  const getNotes = async () => {
    //  Calling Api To Add a New Note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //  Add A notes

  const addNote = async (title, description, tag) => {
    //  Calling Api To Add a New Note

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //  Logic For Adding A new Note
    console.log("adding a new note");

    const note = {
      _id: "64d1ec73cb152c509a443ff2",
      user: "64d0aa04542c5ec9494bc6f3",
      title: title,
      description: description,
      tag: tag,
      date: "2023-08-08T07:19:15.601Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Edit a Notes of Logged in User

  const editNote = async (id, title, description, tag) => {
    // Calling Api To Edit a Note

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    const NewNotes = JSON.parse(JSON.stringify(notes));
    //Logic For Edit

    for (let i = 0; i < NewNotes.length; i++) {
      const element = NewNotes[i];
      if (element._id === id) {
        NewNotes[i].title = title;
        NewNotes[i].tag = tag;
        NewNotes[i].description = description;
        break;
      }

      setNotes(NewNotes);
      props.showAlert("Note Updated", "success");
    }
  };
  //  delete Note

  const deleteNote = async (id) => {
    //  Api To delete  Note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    const json = response.json();
    //  Logic for Delete
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    console.log("item Deleted" + id);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
