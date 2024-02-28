require("dotenv").config();
const cors = require("cors")
const express = require("express");
const authRoute = require("./rotes/auth-rotes")
const admin = require("./rotes/adminRoutes")
const userRotes = require("./rotes/userRotes")
const authenticate = require("./middlewares/authMiddleware")

const app = express();
app.use(cors())
app.use(express.json());

app.use("/auth",authRoute)
app.use("/admin",authenticate,admin)
app.use("/user",userRotes)
app.listen(7000, () => {
    console.log("Server run on port 7000");
  });