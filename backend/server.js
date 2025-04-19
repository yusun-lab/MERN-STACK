require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose'); // MongoDB object modeling tool
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

//global middleware
app.use(express.json()); // Parse incoming JSON requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
}) 

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from .env file
  .then(() => {
    // listen for requests only after successful connection to the database
    app.listen(process.env.PORT, () => {
      console.log('connected to mongo db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error); // Log any connection errors
  });