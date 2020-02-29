const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "developer",
    password: "root",
    database: "photoAlbum"
  }
});

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.get("/photos", async function(req, res) {
  const photos = await knex.select("id", "name").from("photos");
  res.json(photos);
});

app.post("/upload", async function(req, res) {
  req.files.photo.mv(`./photos/${req.files.photo.name}`);

  await knex("photos").insert({
    name: req.files.photo.name
  });

  res.json();
});

app.listen(8080);
