const express = require("express");
const userController = require("../../controllers/userControllers/user.controller.js");
const { route } = require("../../app.js");

const router = express.Router();

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.post("/logout", userController.logoutController);

module.exports = router;
