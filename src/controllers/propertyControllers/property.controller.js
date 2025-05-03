const Property = require("../../models/propertyModels/property.model.js");
const CustomError = require("../../utils/CustomError");

const propertyCreateController = async (req, res, next) => {
  try {
    const { title, description, price, location, amenities, images } = req.body;

    if (
      !title &&
      !description &&
      !price &&
      !location &&
      !amenities &&
      !images
    ) {
      return next(new CustomError("All fields is required", 400));
    }

    const newProperty = await Property.create({
      title,
      description,
      price,
      location,
      amenities,
      images,
      host: req.user._id,
    });

    if (!newProperty)
      return next(new CustomError("Error in creating property", 400));

    res
      .status(201)
      .json({ message: "Propety created successfully", data: newProperty });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const deletePropertyController = async (req, res, next) => {
  try {
    const { id } = req.params;
   console.log(id);

    if (!id) return next(new CustomError("property id is required", 400));
   
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty)
      return next(new CustomError("Error in deletion property", 400));

    res.status(200).json({ message: "Property deleted successfulyy" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const updatePropertyController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next(new CustomError("property id is required", 400));

    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators:true,
    });

    if (!updatedProperty)
      return next(new CustomError("Error in updating property", 400));

    res.status(200).json({
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const viewPropertyController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError("property id is required", 400));

    const propertyDetails = await Property.findById(id);
    if (!propertyDetails)
      return next(new CustomError("Error in fetching property data", 400));

    res.status(200).json({
      message: "Property fetched successfully",
      data: propertyDetails,
    });
  } catch (error) {}
};

const searchPropertyController = async (req, res, next) => {
  try {
    const { location, minPrice, maxPrice } = req.body;

    const query = {
      ...(location && { location: { $regex: location, $options: "i" } }),
      ...(minPrice && { price: { $gte: minPrice } }),
      ...(maxPrice && { price: { $lte: maxPrice } }),
    };

    const property = await Property.find(query);

    if (!property) return next(new CustomError("Property not found", 400));

    res.status(200).json({
      message: "Properties fetched",
      data: property,
    });
  } catch (error) {}
};

module.exports = {
  propertyCreateController,
  updatePropertyController,
  deletePropertyController,
  viewPropertyController,
  searchPropertyController
};
