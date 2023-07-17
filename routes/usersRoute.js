const express = require('express');
const router = express.Router();

const {getAllUsers,postAllUsers, loginUser} = require('../controllers/usersControl')

/**
 * Get the all users for admin
 */
router.route("/users").get(getAllUsers)


/**
 * Saved the user when he/she has been registered first
 * Signup
 */
router.route("/users/signup").post(postAllUsers)

/**
 * Login
 */
router.route("/users/login").post(loginUser)


module.exports = router