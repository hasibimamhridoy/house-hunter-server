const express = require('express');
const router = express.Router();

const {postBookings,createPaymentIntent,getBookings,isAlreadyBooked} = require('../controllers/menageHouseRenterControl')

/**
 * Get the all users for admin
 */
router.route("/bookings").post(postBookings)
router.route("/bookings").get(getBookings)
router.route("/house/isBooked/:email").get(isAlreadyBooked)
router.route("/create-payment-intent").post(createPaymentIntent)




module.exports = router