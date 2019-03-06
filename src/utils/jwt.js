const jwt = require("jsonwebtoken");

module.exports = (request, requireAuth = true) => {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, "supersecret");
    return decoded.userId;
  } else if (requireAuth) {
    throw new Error("Authentication is required");
  } else {
    return null;
  }
};
