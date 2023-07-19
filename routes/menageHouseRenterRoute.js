const express = require('express');
const router = express.Router();

const {postBookings,createPaymentIntent,getBookings,isAlreadyBooked,myGetBookings,cencelHouse} = require('../controllers/menageHouseRenterControl')

/**
 * Get the all users for admin
 */
router.route("/bookings").post(postBookings)
router.route("/bookings").get(getBookings)
router.route("/cancle-house/:id").delete(cencelHouse)
router.route("/house/isBooked/:email").get(isAlreadyBooked)
router.route("/my-get-bookings/:email").get(myGetBookings)
router.route("/create-payment-intent").post(createPaymentIntent)




module.exports = router