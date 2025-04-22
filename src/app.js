const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes/user.routes.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/api/auth", userRoutes);

module.exports = app;
