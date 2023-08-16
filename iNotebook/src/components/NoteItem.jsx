import React, { useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <img src={note.image} alt="" />
          <AiFillDelete
            onClick={() => {
              
              deleteNote(note._id);
              props.showAlert("Note Deleted from server", "success")

            }}
            className="mx-2 cursor delete"
          />
          <AiFillEdit onClick={()=>{updateNote(note )}} className="mx-2 cursor edit" />
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
