const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const handleUserErrors = require("../utils/errorHandler");
const generateToken = require("../utils/generateToken");

// @desc    Register a new User
// @route   POST /api/users/signup
// access   Public
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json({ errors });
  }
};

// @desc    Auth User & Get Token
// @route   POST /api/users/login
// access   Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      throw Error("Invalid Email or Password");
    }
  } catch (err) {
    const errors = handleUserErrors(err);
    console.log('Errors  ', err);
    res.status(400).json({ errors });
  }
};


module.exports = {
  registerUser,
  authUser,
};
