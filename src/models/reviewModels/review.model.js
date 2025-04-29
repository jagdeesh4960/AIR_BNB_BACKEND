const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  comment: {
    type: String,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
