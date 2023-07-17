


const { ObjectId } = require('mongodb');
const { client } = require('../db/connect')

require('dotenv').config()

const houseCollection = client.db("houseHunter").collection("allHouse");


const getAllHouse = async (req, res) => {

    const result = await houseCollection.find().toArray()
    res.status(200).send(result)

}

const getMyHouse = async (req, res) => {

    const email = req.query.email
    console.log(email);
    const query = { "userInfo.email" : email}
    const result = await houseCollection.find(query).toArray()
    res.status(200).send(result)

}

const getMySingleHouse = async (req, res) => {

    const id = req.params.id
    const query = { _id : new ObjectId(id)}
    const result = await houseCollection.findOne(query)
    res.status(200).send(result)

}

const updateMySingleHouse = async (req, res) => {
    const id = req.params.id;
    const updatedInfo = req.body;

    console.log(id,updatedInfo);
  
    const query = { _id: new ObjectId(id) };
    const update = { $set: updatedInfo };
  
    const result = await houseCollection.updateOne(query, update);
  
    res.status(200).send(result);
  };

const deleteMyHouse = async (req, res) => {

    const id = req.params.id
    console.log(id);
    const query = { _id : new ObjectId(id)}
    const result = await houseCollection.deleteOne(query)
    res.status(200).send(result)

}


const addHouse = async (req, res) => {

    const newHouse = req.body

    const result = await houseCollection.insertOne(newHouse)
    res.status(200).send({ status: true, message: "House Added Successfully", data: result})

}

module.exports = { addHouse,getAllHouse,getMyHouse,deleteMyHouse,getMySingleHouse,updateMySingleHouse }