


const { client } = require('../db/connect')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const usersCollection = client.db("houseHunter").collection("users");

const onAuthStateChanged = async (req, res) => {

    const userEmail = {email : req.decoded.userEmail}
    console.log(userEmail);

    const result = await usersCollection.findOne(userEmail)
    res.status(200).send({ status: true, message: "User Logged In", data: {email: result.email , role : result.role} })

}

module.exports = { onAuthStateChanged }