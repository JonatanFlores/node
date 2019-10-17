const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const config = require("../../config/config");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.trim().split(" ");

    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
