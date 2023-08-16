import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("authToken")) {
      getNotes();
    } else {
      navigate("/login");
    }
  },[])
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handelClick = (e) => {
    e.preventDefault();
    console.log("Updated Note is ", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note has been updated To Server", "success");

    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    ref.current.click();
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <div className="container my-3">
        <AddNote showAlert={props.showAlert} />
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        ></button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      value={note.etitle}
                      minLength={5}
                      onChange={onChange}
                      type="text"
                      name="etitle"
                      className="form-control"
                      id="etitle"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      value={note.edescription}
                      minLength={5}
                      type="text"
                      onChange={onChange}
                      className="form-control"
                      id="edescription"
                      name="edescription"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      tag
                    </label>
                    <input
                      type="text"
                      value={note.etag}
                      onChange={onChange}
                      className="form-control"
                      id="etag"
                      name="etag"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handelClick}
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" container row my-3">
        <div className="container">
          {notes.length === 0 && " No Notes To Show"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
