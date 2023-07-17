const express = require('express');
const router = express.Router();

const {onAuthStateChanged} = require('../controllers/onAuthStateChangedController')


/**
 * Login
 */
router.route("/users/onAuthStateChanged").post(onAuthStateChanged)


module.exports = router