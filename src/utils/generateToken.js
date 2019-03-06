const jwt = require("jsonwebtoken");

module.exports = userId => {
  return jwt.sign({ userId }, "supersecret", { expiresIn: "1 day" });
};
