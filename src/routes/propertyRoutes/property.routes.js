const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const propertyController = require("../../controllers/propertyControllers/property.controller.js");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  propertyController.propertyCreateController
);

router.delete(
  "/delete/:id",
  authMiddleware,
  propertyController.deletePropertyController
);

router.put(
  "/update/:id",
  authMiddleware,
  propertyController.updatePropertyController
);

router.get(
  "/view/:id",
  authMiddleware,
  propertyController.viewPropertyController
);

module.exports = router;
