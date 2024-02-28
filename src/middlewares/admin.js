const createError = require("../utils/createError");

const admin = async (req, res, next) => {
  try {
    console.log("Value of req.user:", req.user);
    if (req.user && req.user.role === "ADMIN") {
      next();
    } else {
      return next(createError(403, "Forbidden"));
    }
  } catch (err) {
  
    next(err);
  }
};

module.exports = admin;
