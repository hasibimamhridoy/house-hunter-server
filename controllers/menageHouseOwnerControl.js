


const { ObjectId } = require('mongodb');
const { client } = require('../db/connect')

require('dotenv').config()

const houseCollection = client.db("houseHunter").collection("allHouse");
const bookingsCollection = client.db("houseHunter").collection("bookings");


const getAllHouse = async (req, res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    console.log(page, limit);
    const skip = (page * limit)

    const filters = req.query;

    // Construct the query based on the selected filters
    const query = {};

    const filterConditions = [];


    if (filters?.cities) {
        filterConditions.push({ house_city : filters?.cities });
        console.log('Dhukse');
    }

    if (filters?.how_many_beedrooms) {
        filterConditions.push({ house_bedRoom : filters?.how_many_beedrooms });
        console.log('Dhukse');
    }

    if (filters?.how_many_bathrooms) {
        filterConditions.push({ house_bathRoom : filters?.how_many_bathrooms });
        console.log('Dhukse');
    }
    if (filters?.room_size) {
        filterConditions.push({ house_room_size : filters?.room_size });
        console.log('Dhukse');
    }
    if (filters?.is_available) {
        filterConditions.push({ status : filters?.is_available });
        console.log('Dhukse');
    }

    // Add the age range filter condition
    if (filters?.rent_per_month) {
        const rentRange = filters.rent_per_month.split(',');
        const minrent = parseInt(rentRange[0]);
        const maxrent = parseInt(rentRange[1]);

        console.log(minrent,maxrent);

        // Use the age range in your filtering query
        filterConditions.push({
            rent_per_month: { $gte: minrent, $lte: maxrent }
        });

        console.log(filterConditions);
    }


    // Add other fields for filtering as needed
    if (filterConditions.length > 0) {
        query.$and = filterConditions;
    }

    try {
        const result = await houseCollection.find(query).skip(skip).limit(limit).toArray();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}


const getAllHouseCount = async (req, res) => {


    const count = await houseCollection.countDocuments()
    res.send({ count });

}

const getMyHouse = async (req, res) => {

    const email = req.query.email
    console.log(email);
    const query = { "userInfo.email" : email}
    const result = await houseCollection.find(query).toArray()
    res.status(200).send(result)

}


const getMyBookingsHouse = async (req, res) => {

    const email = req.query.email
    console.log(email);
    const query = { "userInfo.email" : email}
    const result = await bookingsCollection.find(query).toArray()
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

module.exports = { addHouse,getAllHouse,getMyHouse,deleteMyHouse,getMySingleHouse,updateMySingleHouse,getAllHouseCount,getMyBookingsHouse }