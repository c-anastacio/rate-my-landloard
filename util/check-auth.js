const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const header = context.req.headers.authorization;
  if (header) {
    const token = header.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    } else {
      throw new Error("Token must be valid");
    }
  } else {
    throw new Error("Auth must be provided");
  }
};
