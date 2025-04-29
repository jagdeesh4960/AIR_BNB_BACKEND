const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes/user.routes.js");
const propertyRoutes = require("./routes/propertyRoutes/property.routes.js");
const bookingRoutes = require("../src/routes/bookingRoutes/booking.routes.js");
const paymentRoutes = require("../src/routes/paymentRoutes/payment.routes.js");
const adminRoutes = require("../src/routes/adminRoutes/admin.routes.js");
const reviewRoutes = require("./routes/reviewRoutes/review.routes.js");
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
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/review", reviewRoutes);

app.use(errorHandler);

module.exports = app;
