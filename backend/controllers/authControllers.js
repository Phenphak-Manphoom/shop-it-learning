import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import ErrorHandle from "../utils/errorHandler.js";
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
