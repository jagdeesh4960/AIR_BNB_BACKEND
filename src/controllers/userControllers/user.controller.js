const User = require("../../models/userModels/user.model.js");
const bcrypt = require("bcrypt");
const CustomError = require("../../utils/customError.js");
const cacheClient = require("../../services/cache.services.js");
const jwt = require("jsonwebtoken");
const { resetPasswordTemplate } = require("../../utils/emailTemplet.js");
const { sendMail } = require("../../utils/email.js");

const registerController = async (req, res, next) => {
  const { userName, email, password, mobile,address} = req.body;
   
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

const currentUserController = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "authentication successfull", user: user });
  } catch (error) {}
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { userName, email, address, mobile, newPassword } = req.body;

    const user = await User.findOne({ email: email });
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (address) user.address = address;
    if (mobile) user.mobile = mobile;

    let newToken = null;
    if (password) {
      newToken = user.generateAuthToken();

      user.password = newPassword;
    }

    await user.save();

    if (!newToken)
      return next(new CustomError("error while generating new jwt token", 400));

    res.cookie("token", newToken);

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user: user,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return next(new CustomError("Incorrect email", 400));

    const user = await user.findOne({ email });

    if (!user) return next(new CustomError("User not found", 404));

    const rawToken = jwt.sign({ id: user._id }, process.env.JWT_RAW_SECRET, {
      expiresIn: "10m",
    });

    const resetLink = `http://localhost/api/user/reset-password/${rawToken}`;

    const emailTemplate = resetPasswordTemplate(req.user.userName, resetLink);

    await sendMail("ddhote780@gmail.com", "Reset password", emailTemplate);

    res.status(200).json({
      success: true,
      message: "reset password link shared on your gmail",
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateUserProfile,
  resetPasswordController,
};
