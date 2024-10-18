const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.locals.errors = [];
  next();
});

app.get("/", (req, res) => {
  res.render("homepage", { errors: [] });
});

app.get("/login", (req, res) => {
  res.render("login", { errors: [] });
});

app.post("/register", (req, res) => {
  const errors = [];

  if (typeof req.body.username !== "string") req.body.username = "";
  if (typeof req.body.password !== "string") req.body.password = "";

  const username = req.body.username.trim();

  if (!username) {
    errors.push("You must provide Username");
  } else {
    if (username.length < 8) {
      errors.push("Username must be at least 8 characters");
    }
    if (username.length > 12) {
      errors.push("Username cannot exceed 12 characters");
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      errors.push("Username can only contain letters and numbers");
    }
  }

  if (errors.length > 0) {
    res.render("homepage", { errors });
  } else {
    res.send("Thank you for filling the form");
  }
});

app.listen(3000);
