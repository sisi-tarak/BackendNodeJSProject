const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/sisi", (req, res) => {
  res.render("homepage");
});

app.listen(3000);
