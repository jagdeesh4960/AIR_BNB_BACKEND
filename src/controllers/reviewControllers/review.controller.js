const Review = require("../../models/reviewModels/review.model.js");
const Property = require("../../models/propertyModels/property.model.js");
const CustomError = require("../../utils/CustomError");
const Booking = require("../../models/bookingModels/booking.models.js");

const createReviewController = async (req, res, next) => {
  try {
    const { ratings, comment, property_id } = req.body;

    if (!ratings || !comment || !property_id)
      return next(new CustomError("required missing fields", 400));

    const bookings = await Booking.findOne({ user_id: req.user._id });
    if (!bookings) return next(new CustomError("Access denied", 400));

    // if(property.user)

    const reviews = await Review.create({
      property: property_id,
      user: req.user._id,
      ratings,
      comment,
    });

    if (!reviews)
      return next(new CustomError("Error in creating reviews", 400));

    res.status(201).json({
      success: true,
      message: "Review created",
      data: reviews,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const deleteReviewController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next(new CustomError("Review ID is missing", 400));

    const delReview = await Review.findByIdAndDelete(id);

    if (!delReview)
      return next(new CustomError("Error while deleting review", 400));

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const updateReviewController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next(new CustomError("Review id is missing", 400));

    const updateReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateReview)
      return next(new CustomError("Error while updating review", 400));

    res
      .status(200)
      .json({ success: true, message: "Review updated", data: updateReview });
  } catch (error) {}
};

const viewReviewController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next(new CustomError("Review id is missing", 400));

    const viewReview = await Review.findById(id);

    if (!viewReview)
      return next(new CustomError("Error in showing reviews", 400));

    res.status(200).json({
      success: true,
      message: "Review fetched",
      data: viewReview,
    });
  } catch (error) {}
};

module.exports = {
  createReviewController,
  updateReviewController,
  deleteReviewController,
  viewReviewController,
};
