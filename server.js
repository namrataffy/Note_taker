const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
