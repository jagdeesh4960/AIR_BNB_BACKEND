const User = require("../../models/userModels/user.model.js");
const Property = require("../../models/propertyModels/property.model.js");
const Booking = require("../../models/bookingModels/booking.models.js");
const CustomError = require("../../utils/customError.js");

const getAllUsersController = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res
      .status(200)
      .json({ success: true, message: "users fetched", data: allUser });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allUser = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const getAllBookingsController = async (req, res, next) => {
  try {
    const allBookings = await Booking.find();
    res
      .status(200)
      .json({ success: true, message: "Bookings fetched", data: allBookings });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const deleteBookingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const delBook = await Booking.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const getAllPropertyController = async (req, res, next) => {
  try {
    const allProprties = await Property.find();
    res
      .status(200)
      .json({ success: true, message: "Property fetched", data: allProprties });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const deletePropertyController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const delProp = await Property.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Property deleted" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  getAllUsersController,
  deleteUserController,
  getAllBookingsController,
  deleteBookingController,
  getAllPropertyController,
  deletePropertyController,
};
