const jwt = require("jsonwebtoken");

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { generateToken, maxAge };
