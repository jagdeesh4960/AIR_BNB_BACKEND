const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes/user.routes.js");
const propertyRoutes = require("./routes/propertyRoutes/property.routes.js");
const bookingRoutes = require("../src/routes/bookingRoutes/booking.routes.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/api/auth", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/booking", bookingRoutes);

app.use(errorHandler);

module.exports = app;
