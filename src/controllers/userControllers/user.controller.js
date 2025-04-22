const User = require("../../models/userModels/user.model.js");
const bcrypt = require("bcrypt");
const CustomError = require("../../utils/CustomError.js");
const cacheClient = require("../../services/cache.services.js");

const registerController = async (req, res, next) => {
  const { userName, email, password, mobile, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new CustomError("user already exist", 409));

    const user = await User.create({
      userName,
      email,
      password,
      address,
      mobile,
    });

    const token = await user.generateAuthToken();
    console.log("token inside controller->", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
    });

    res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.authenticateUser(email, password);
    console.log("user->", user);

    const token = await user.generateAuthToken();
    console.log("this way token -> ", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "User Logged in", token: token });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const logoutController = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) return next(new CustomError("User unauthorized", 401));

    const blaclistToken = await cacheClient.set(
      token,
      "blacklisted",
      "EX",
      3600
    );

    res.clearCookie("token");
    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
