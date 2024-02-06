const express = require('express');
const {
  getNotes,
  createNote,
  GetNoteById,
  UpdateNoteById,
  DeleteNoteById,
} = require("../controllers/notes");
const router = express.Router();

router.get('/', getNotes);
router.get("/:noteId", GetNoteById);
router.post('/', createNote);
router.put("/:noteId", UpdateNoteById);
router.delete("/:noteId", DeleteNoteById);

module.exports = router;