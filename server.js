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

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res) {
  let theJSON = fs.readFile("./db/db.json", function(err, data) {
    if (err) return console.error(err);
    let X = JSON.parse(data);
    console.log(X);
    return X;
  });
  console.log(theJSON);
  res.json(theJSON);
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
