require('dotenv').config(); 
const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const userService = require("../services/user-service");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { firstname,lastname,email, password,phone,gender } = req.body;
    console.log(req.body)

    if (!email || !password || !phone) {
      return createError(400, "Email and password are required");
    }

    if (typeof email !== "string" || typeof password !== "string" || typeof phone !== "string" || typeof firstname !== "string"|| typeof lastname !== "string" || typeof gender!== "string" ) {
      return createError(400, "Email or password is invalid");
    }

    const isUserExist = await userService.getUserByEmail(email);

    if (isUserExist) {
      return createError(400, "User already exist");
    }
    if (typeof phone !== 'string') {
      return createError(400, 'Invalid phone number');
    }
    if (!/^\d+$/.test(phone) || phone.length !== 10) {
      return createError(400, "Invalid phone number");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await userService.createUser(firstname, lastname,email,hashedPassword,phone,gender);

    res.json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return createError(400, "Email and password are required");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return createError(400, "Email or password is invalid");
    }

    const isUserExist = await userService.getUserByEmail(email);

    if (!isUserExist) {
      return createError(400, "Email or password is invalid");
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatch) {
      return createError(400, "Email or password is invalid");
    }

    const token = jwt.sign({ id: isUserExist.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
    console.log(token)
  } catch (err) {
    next(err);
  }
};
exports.getme = (req,res,next) => {
  res.json(req.user)
}

