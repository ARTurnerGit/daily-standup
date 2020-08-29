const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const api = require("./api");

const app = express();

app.set("port", process.env.PORT || 8081);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", api);
app.use(express.static("static"));

app.use(morgan("dev"));

app.use(function (req, res) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

mongoose.connect(
  `mongodb+srv://ARTurnerGit:${process.env.DB_PASSWORD}@sandbox.f58os.mongodb.net/virtualstandups`,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
  app.listen(app.get("port"), function () {
    console.log("API Server listening on port", app.get("port"), "!");
  });
});
