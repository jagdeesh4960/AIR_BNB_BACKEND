const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes/user.routes.js");
const propertyRoutes = require("./routes/propertyRoutes/property.routes.js");
const bookingRoutes = require("../src/routes/bookingRoutes/booking.routes.js");
const paymentRoutes = require("../src/routes/paymentRoutes/payment.routes.js");
const adminRoutes = require("../src/routes/adminRoutes/admin.routes.js");
const reviewRoutes = require("./routes/reviewRoutes/review.routes.js");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(
  cors({
    origin: process.env.REACT_APP_API_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet()); 
app.use(cookieParser());
app.use(morgan("tiny"));

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message); // will show in Render logs

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


app.get("/", (req, res) => {
  res.send("hello from server");
});
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy!" });
});


app.use("/api/auth", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/review", reviewRoutes);

app.use(errorHandler);

module.exports = app;
