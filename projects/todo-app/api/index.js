const express = require("express");
const app = express();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "developer",
    password: "root",
    database: "todos"
  }
});

app.use(express.json());

app.get("/todos", async function(req, res) {
  const todos = await knex.select("id", "name", "isCompleted").from("todos");
  res.json(todos);
});

app.post("/todos", async function(req, res) {
  const result = await knex("todos").insert({
    name: req.body.name,
    isCompleted: req.body.isCompleted
  });

  res.json(result[0]);
});

app.put("/todos/:id", async function(req, res) {
  await knex("todos")
    .update({ isCompleted: req.body.isCompleted })
    .where({
      id: req.params.id
    });

  res.json();
});

app.delete("/todos/:id", async function(req, res) {
  await knex("todos")
    .delete()
    .where({
      id: req.params.id
    });

  res.json();
});

app.listen(8080);
