const express = require("express");
const userController = require("../../controllers/userControllers/user.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.post("/logout", userController.logoutController);
router.get(
  "/current-user",
  authMiddleware,
  userController.currentUserController
);

module.exports = router;
