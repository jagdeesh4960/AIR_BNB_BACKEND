const express = require("express");
const adminMiddleware = require("../../middlewares/adminMiddleware.js");
const {
  getAllUsersController,
  deleteUserController,
  getAllBookingsController,
  deleteBookingController,
  getAllPropertyController,
  deletePropertyController,
} = require("../../controllers/adminControllers/admin.controller");

const router = express.Router();

router.get("/all-users", adminMiddleware, getAllUsersController);
router.delete("/delete-user/:id", adminMiddleware, deleteUserController);
router.get("/all-booking", adminMiddleware, getAllBookingsController);
router.delete("/delete-booking/:id", adminMiddleware, deleteBookingController);
router.get("/all-properties", adminMiddleware, getAllPropertyController);
router.delete(
  "/delete-property/:id",
  adminMiddleware,
  deletePropertyController
);

module.exports = router;
