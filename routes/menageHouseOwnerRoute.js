const express = require('express');
const router = express.Router();

const {addHouse,getAllHouse,getMyHouse,deleteMyHouse,getMySingleHouse,updateMySingleHouse,getAllHouseCount} = require('../controllers/menageHouseOwnerControl')

/**
 * Get the all users for admin
 */
router.route("/add-house").post(addHouse)
router.route("/all-house").get(getAllHouse)
router.route("/all-house/count").get(getAllHouseCount)
router.route("/my-house").get(getMyHouse)
router.route("/single-house/:id").get(getMySingleHouse)
router.route("/update-house/:id").put(updateMySingleHouse)
router.route("/deleted-house/:id").delete(deleteMyHouse)



module.exports = router