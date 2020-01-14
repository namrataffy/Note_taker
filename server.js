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

app.get("/api/notes", function(req, res) {
  let theJSON = null;
  fs.readFile("./db/db.json", function(err, data) {
    console.log(data);
    if (err) return console.error(err);
    theJSON = JSON.parse(data);
    res.json(theJSON);
  });
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  // let theJSON = null;
  fs.readFile("./db/db.json", function(err, data) {
    if (err) return console.error(err);
    let theJSON = JSON.parse(data);
    console.log(theJSON);
    theJSON.push(newNote);
    write(theJSON);
  });

  function write(theJSON) {
    fs.writeFile("./db/db.json", JSON.stringify(theJSON), function(err, data) {
      if (err) return console.log(err);
      console.log("saved");
    });
    let responder = {
      noteTitle: req.body.title,
      noteContent: req.body.text,
      ID: theJSON.length
    };

    res.json(responder);
  }
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
