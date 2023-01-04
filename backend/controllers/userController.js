const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const handleUserErrors = require("../utils/errorHandler");
const { createToken, maxAge } = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Inside Register ", email, password);

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user, token });
  } catch (err) {
    const errors = handleUserErrors(err);
    console.log("Errors ===> ", errors);
    res.status(400).json({ errors });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        console.log("Auth: ", auth);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user, token });
      } else {
        throw Error("incorrect password");
      }
    } else {
      throw Error("incorrect email");
    }
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json({ errors });
  }
};

const logout = (req, res) => {
  // console.log('Inside Logout ', res.cookie("jwt", "", { maxAge: 1 }));
  // res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.status(200).json("Success");
};

module.exports = {
  registerUser,
  authUser,
  logout,
};
