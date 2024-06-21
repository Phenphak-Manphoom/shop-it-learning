import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import ErrorHandle from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";

//register user =>  /api/register
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

//login user =>  /api/login
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandle("Please enter email and password", 400));
  }

  // find user in the database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }

  //check if password is correct
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//logout user =>  /api/logout
export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Logged out",
  });
});

//forgot password=>  /api/password/forgot
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  // find user in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandle("User not found with this email", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save();

  //create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/api/password/reset/${resetToken}`;
  const message = getResetPasswordTemplate(user?.name, resetUrl);
  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });
    res.status(200).json({
      message: `Email sent to : ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandle(error?.message, 500));
  }

  sendToken(user, 200, res);
});
