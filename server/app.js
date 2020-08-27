const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const api = require("./api");

const app = express();

app.set("port", process.env.PORT || 8081);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("./api", api);
app.use(express.static("static"));

app.use(morgan("dev"));

app.use(function (req, res) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

app.listen(app.get("port"), function () {
  console.log("API Server listening on port", app.get("port"));
});
