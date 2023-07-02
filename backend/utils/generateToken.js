const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};
