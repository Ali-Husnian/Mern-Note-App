const Note = require("./../models/nodeModel");

exports.getNotes = async (req, res) => {
  try {
    const note = await Note.find().sort({ createdAt: -1 });

    if (!note)
      res.status(404).json({
        status: "fail",
        message: "Note not found!",
      });
    res.status(200).json({
      status: "success",
      length: note.length,
      data: note,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.CreateNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    if (!newNote)
      res.status(403).json({
        status: "fail",
        message: "Required all fields!",
      });

    res.status(201).json({
      status: "success",
      note: newNote,
    });
  } catch (error) {
    // console.log(error);
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.updateNote = async (req, res) => {
  try {
    const newNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newNote)
      res.status(403).json({
        status: "fail",
        message: "Required all fields!",
      });

    res.status(201).json({
      status: "success",
      note: newNote,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note)
      res.status(403).json({
        status: "fail",
        message: "Record not found with that IDs!",
      });
    res.status(204).json({
      status: "sucess",
      message: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getOneNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      res.status(403).json({
        status: "fail",
        message: "Record not found with that IDs!",
      });
    res.status(200).json({
      status: "success",
      length: note.length,
      data: note,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
