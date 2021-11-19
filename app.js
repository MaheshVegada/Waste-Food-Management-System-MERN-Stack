const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/user-routes');

require('dotenv').config();

const app = express();
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/users', usersRoutes);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://we-dont-waste-food.herokuapp.com',
  'https://we-dont-waste-food.herokuapp.com',
  'https://api.cloudinary.com/v1_1/wdwfsdp/image/upload'
]
// app.use(
//   cors({
//       origin: function (origin, callback) {
//           if (!origin) return callback(null, true)
//           if (allowedOrigins.indexOf(origin) === -1) {
//               var msg =
//                   'The CORS policy for this site does not ' +
//                   'allow access from the specified Origin.'
//               return callback(new Error(msg), false)
//           }
//           return callback(null, true)
//       },
//   })
// )

if(process.env.NODE_ENV == "production"){
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(
    process.env.MONGO_URI, {"useNewUrlParser": true, "useUnifiedTopology": true, 'useCreateIndex': true}
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log(err);
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);