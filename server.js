const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});

// Create Route "/create will create file with current datetime in files folder".
app.get("/create", function (req, res) {
  let date = new Date().toString();
  let filename = date.replace(/:/g, "-");
  fs.writeFile(`./files/${filename}.txt`, date, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, "/html/error.html"));
      console.log(err);
    }
    res.sendFile(path.join(__dirname, "/html/createFile.html"));
  });
});

// List Route "/list will list all files in files folder".
app.get("/list", (req, res) => {
  fs.readdir("./files", (error, files) => {
    if (error) {
      console.log(error);
    }
    let fileList = "";
    files.map((file) => {
      fileList += `<li>${file}</li>`;
    });
    fileList = `<ul>${fileList}<ul><br ><a href="/">Homepage</a>`;
    res.send(fileList);
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
