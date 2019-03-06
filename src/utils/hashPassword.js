const bcrypt = require("bcryptjs");

module.exports = password => {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters or longer");
  }
  return bcrypt.hash(password, 10);
};
