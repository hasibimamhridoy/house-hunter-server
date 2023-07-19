


const { client } = require('../db/connect')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const usersCollection = client.db("houseHunter").collection("users");

const getAllUsers = async (req, res) => {
    console.log('hit');
    const result = await usersCollection.find().toArray()
    res.status(200).send(result)

}


/**
 * Saved the user when he/she has been registered first
 */

const postAllUsers = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        phoneNumber: req.body.email,
        password: hashedPassword
    }

    const query = { email: newUser.email }
    const existingEmail = await usersCollection.findOne(query)
    console.log(existingEmail);

    if (existingEmail?.email === newUser.email) {

        return res.send({ status: true, message: "User Already Exists" })
    }
    const result = await usersCollection.insertOne(newUser)
    res.status(200).send({ status: true, message: "Signup was Successful", data: result })

}


/**
 * LoginUser
 */

const loginUser = async (req, res) => {

    const userEmail = req.body.email
    const query = {email: userEmail}
    const user = await usersCollection.findOne(query)

    if (user ){
        
        const isValidPass = await bcrypt.compare(req.body.password,user.password);


        if (isValidPass) {
            
            //genarel token
            const token = jwt.sign({
                userEmail : user.email,
                userId : user._id
            },process.env.ACCESS_TOKEN)

            res.status(200).send({ status: true, message: "Login Successfull",access_token : token, data: {email: user.email , role : user.role ,name : user.name} })


        } 
        
        else {
            res.status(401).json({
                "error" : "Authentication Failed !"
            })
        }


    }
    
    else {
        res.status(401).json({
            "error" : "Authentication Failed !"
        })
    }


}



module.exports = { getAllUsers, postAllUsers,loginUser }