const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000;
const {run} = require('./db/connect')
const users_routes = require('./routes/usersRoute')
const onAuthStateChanged = require('./routes/onAuthStateChanged')
const menageHouseOwner = require('./routes/menageHouseOwnerRoute')
const menageHouseRenter = require('./routes/menageHouseRenterRoute')


//all middle ware
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization) {
      return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
          return res.status(401).send({ error: true, message: 'unauthorized access' })
      }
      req.decoded = decoded;
      console.log(req.decoded);
      next();
  })
}



// middleware
app.use(cors());
app.use(express.json());

//routes middleware
app.use("/api",users_routes)
app.use("/api",menageHouseOwner)
app.use("/api",menageHouseRenter)

app.use("/api",verifyJWT,onAuthStateChanged)



run()
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
})


