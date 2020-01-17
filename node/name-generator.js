const firstNames = require("./first-names.js");
const lastNames = require("./last-names.js");

const randomIndexFirstName = Math.round(Math.random() * 4);
const randomIndexLastName = Math.round(Math.random() * 4);
const randomName =
  firstNames[randomIndexFirstName] + " " + lastNames[randomIndexLastName];

console.log(randomName);
