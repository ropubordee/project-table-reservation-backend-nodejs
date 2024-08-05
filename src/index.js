require("dotenv").config();
const cors = require("cors")
const express = require("express");
const authRoute = require("./rotes/auth-rotes")
const admin = require("./rotes/adminRoutes")
const userRotes = require("./rotes/userRotes")
const authenticate = require("./middlewares/authMiddleware")
const path = require("path")
const product = require("./rotes/product-Rotes")
const reservations = require("./rotes/Reservations")
const payments = require("./rotes/PaymentPageRoutes")
const Checkslip = require("./rotes/Checkslip-Rotes")
const Booking = require("./rotes/BookingRoutes")
const search = require("./rotes/searchroutes")

const app = express();
app.use(cors())
app.use(express.json());

app.use("/auth",authRoute)
app.use("/admin",authenticate,admin)
app.use("/userupdateRole",userRotes)
app.use("/ShowHome",product)
app.use("/product",authenticate, product)
app.use("/reservationstable",authenticate,reservations)
app.use("/booking",authenticate,Booking)
app.use("/payment",authenticate,payments)
app.use("/checkslip",Checkslip)
app.use("/search",search)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(7000, () => {
    console.log("Server run on port 7000");
  });