
const { ObjectId } = require('mongodb');
const { client } = require('../db/connect')
require('dotenv').config()
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)


const bookingsCollection = client.db("houseHunter").collection("bookings");

const postBookings = async (req, res) => {

    const booking = req.body
    console.log(booking);
    const result = await bookingsCollection.insertOne(booking)
    console.log(result)
    res.send(result)

}

const getBookings = async (req, res) => {

    const result = await bookingsCollection.find().toArray()
    console.log(result)
    res.send(result)

}

const myGetBookings = async (req, res) => {

    const email = req.params.email
    const query = {"bookingRenterInfo.email" : email}
    const result = await bookingsCollection.find(query).toArray()
    console.log(result)
    res.send(result)

}

const isAlreadyBooked = async (req, res) => {

    try {
        const email = req.params.email;
        const query = {"bookingRenterInfo.email" : email}
        const result = await bookingsCollection.find(query).toArray();
    
        const disabledIds = result.map(res=>res.houseId)
        console.log(disabledIds);

        if (result) {
          res.send(disabledIds);
        } else {
          res.status(404).send('Item not found');
        }
      } catch (error) {
        res.status(500).send('Error retrieving item');
      }

}

const createPaymentIntent = async (req, res)=>{
    const { price } = req.body

    console.log(price);
    const amount = parseFloat(price) * 100
    if (!price) return
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
}
const cencelHouse = async (req, res)=>{
    const id= req.params.id
    const query = {_id : new ObjectId(id)}
    const result = await bookingsCollection.deleteOne(query)
    res.send(result)
}

module.exports = { postBookings,createPaymentIntent,getBookings,isAlreadyBooked,myGetBookings,cencelHouse }