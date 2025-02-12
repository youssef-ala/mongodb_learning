const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  // get all courses from db using course model
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res,next) => {
  // Corrected parameter order
  const { firstName, lastName, email, password } = req.body;
const oldUser = await User.findOne({email: email})
if(oldUser){
const error = appError.create('user already exists', 400, httpStatusText.FAIL)
return next(error)
}

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await newUser.save();
res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser }


})
  // Your logic to handle user registration goes here
  // For example:
  // const user = await User.create({ firstName, lastName, email, password });
  // res.status(201).json({ success: true, data: user });
});

const login = () => {};

module.exports = {
  getAllUsers,
  register,
  login,
};
