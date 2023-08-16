const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const fetchuser = require("../middlewares/fetchuser");
//  Route 1 : to get all the notes from server of user logged in.
let success = false
try {
  router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  });
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal Error");
}

//  Route 2 : to Add a new notes to server of user logged in.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Kuch Likh Toh Lo Bhai").isLength({ min: 5 }),
    body("tag", "Kuch Likh Toh Lo Bhai"),
    body("description", "Description me gyan toh pelo ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // const If there is Error, BAdRequest
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        tag,
        description,
        title,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Error");
    }
  }
);

//  Route 3 : to Update an existing notes to server of user logged in.
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;

    // create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //  Find a note to be Updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  }
);
//  Route 4 : To delte a particular Note
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      //  Find a note to be Deleted
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("NOT FOUND");
      }
      //  Allow deletion only if user own it
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("NOT Allowed");
      }
      note = await Note.findByIdAndDelete(req.params.id);

      res.json({ Sucess: "Note Has Been Deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Error");
    }
  }
);

module.exports = router;
