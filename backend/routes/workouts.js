const express = require('express');
const Workout = require('../models/workoutModel'); // Import the workout model

const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
  res.json({ message: 'GET all workouts' });
});

// GET a single workout
router.get('/:id', (req, res) => {
  res.json({ message: 'GET a single workout'})
})

// POST a new workout
router.post('/', async (req, res) => {
  const { title, reps, load } = req.body; // Destructure the request body to get the workout details

  try {
    const newWorkout = await Workout.create({ title, reps, load }); // Create a new workout using the model
    res.status(200).json(newWorkout); // Send a 200 status code with the created workout as a response
  } catch (error) {
    res.status(400).json({ error: error.message}); // Send a 400 status code with the error message if an error occurs
    
  }
})

// DELETE a workout
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE a workout'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
  res.json({ message: 'UPDATE a new workout'})
})

module.exports = router;

