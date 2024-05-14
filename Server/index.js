const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", noteRoutes);

mongoose
  .connect(
    "mongodb+srv://fawad7998:fawad6035@cluster0.urediab.mongodb.net/Testing?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB is connected successfully!");
  })
  .catch((err) => {
    console.log(err, "connection error");
  });
const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
