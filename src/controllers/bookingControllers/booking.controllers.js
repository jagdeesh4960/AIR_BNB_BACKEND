const Booking = require("../../models/bookingModels/booking.models.js");
const Property = require("../../models/propertyModels/property.model.js");
const paymentInstance = require("../../services/payment.services.js");
const CustomError = require("../../utils/CustomError");

const createBookingController = async (req, res, next) => {
  try {
    const { property_id, checkin_date, checkout_date, totalPrice } = req.body;

    const property = await Property.findById(property_id);
    if (!property) return next(new CustomError("Property not found", 400));

    if (!property_id && !checkin_date && !checkout_date && !totalPrice)
      return next(new CustomError("All fields are required", 400));

    const booking = await Booking.create({
      property: property_id,
      user_id: req.user._id,
      checkin_date,
      checkout_date,
      totalPrice,
      status: "Pending",
    });

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: `receipt ${booking._id}`,
      payment_capture: 1,
    };

    const razorpayOrder = await paymentInstance.orders.create(options);

    booking.razorpayOrderId = razorpayOrder.id;
    await booking.save();

    // email--------

    res.status(200).json({
      success: true,
      data: booking,
      amount: totalPrice,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  createBookingController,
};
