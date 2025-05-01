const Workout = require('../models/workoutModel'); // Import the workout model
const mongoose = require('mongoose'); // Import mongoose for MongoDB object modeling

// GET all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); // Fetch all workouts from the database and sort them by creation date in descending order

  res.status(200).json(workouts); // Send a 200 status code with the workouts as a response in JSON format
}


// GET a single workout
const getWorkout = async (req, res) => {
  const {id} = req.params; // Extract the workout ID from the request parameters

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' }); // If the ID is not valid, send a 404 status code with an error message
  }

  const workout = await Workout.findById(id); // Find the workout by ID in the database

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' }); // If no workout is found, send a 404 status code with an error message
  }

  res.status(200).json(workout); // Send a 200 status code with the found workout as a response
}

// POST a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body; // Destructure the request body to get the workout details

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title'); 
  };
  if (!reps) {
    emptyFields.push('reps'); 
  };
  if (!load) {
    emptyFields.push('load'); 
  };
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields }); // If any field is empty, send a 400 status code with an error message and the empty fields
  }

  // add doc to db
  try {
    const newWorkout = await Workout.create({ title, reps, load }); // Create a new workout using the model
    res.status(200).json(newWorkout); // Send a 200 status code with the created workout as a response
  } catch (error) {
    res.status(400).json({ error: error.message}); // Send a 400 status code with the error message if an error occurs
  }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' }); // If the ID is not valid, send a 404 status code with an error message
  }

  const workout = await Workout.findOneAndDelete({ _id: id }); // Find the workout by ID and delete it from the database

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' }); // If no workout is found, send a 404 status code with an error message
  }

  res.status(200).json(workout); // Send a 200 status code with the deleted workout as a response
}

// UPDATE a workout
  const updateWorkout = async (req, res) => {
    const { id } = req.params; // Extract the workout ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such workout' }); // If the ID is not valid, send a 404 status code with an error message
    }

    const workout = await Workout.findOneAndUpdate({ _id: id}, {
      ...req.body // Update the workout with the new data from the request body
    })

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' }); // If no workout is found, send a 404 status code with an error message
    }

    res.status(200).json(workout); // Send a 200 status code with the updated workout as a response
  }

module.exports = {
  getWorkouts, // Export the getWorkouts function to be used in the routes
  getWorkout, // Export the getWorkout function to be used in the routes
  createWorkout, // Export the createWorkout function to be used in the routes
  deleteWorkout, // Export the deleteWorkout function to be used in the routes
  updateWorkout // Export the updateWorkout function to be used in the routes
}