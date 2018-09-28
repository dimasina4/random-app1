const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const employes = require("./routes/api/employes");

const app = express();

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("Connected to DB."))
  .catch(err => console.log(err));

app.use("/api/employes", employes);

const port = 5000;

app.listen(port, () => console.log("Server started on port " + port));
