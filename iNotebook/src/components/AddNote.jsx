import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote, getNotes } = context;
  const handelClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    getNotes();

    setNote({ title: "", description: "", tag: "" });
  };
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a Notes</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            minLength={5}
            value={note.title}
            type="text"
            name="title"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            minLength={5}
            value={note.description}
            onChange={onChange}
            type="Description"
            className="form-control"
            id="description"
            name="description"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            tag
          </label>
          <input
            onChange={onChange}
            type="tag"
            value={note.tag}
            className="form-control"
            id="tag"
            name="tag"
          />
        </div>
        <button
          disabled={
            note.title.length <= 5 ||
            note.description.length <= 5 ||
            note.tag.length <= 2
          }
          type="submit"
          onClick={handelClick}
          className="btn btn-primary"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
