const express = require("express");
const noteController = require("./../controllers/notecontroller");

const router = express.Router();

router.get("/view", noteController.getNotes);
router.post("/create", noteController.CreateNote);
router.patch("/update/:id", noteController.updateNote);
router.delete("/remove/:id", noteController.deleteNote);
router.get("/view/:id", noteController.getOneNote);

module.exports = router;
