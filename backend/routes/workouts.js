const express = require('express');

// const Workout = require('../models/workoutModel'); 

const {
  getWorkouts,
  getWorkout,
  createWorkout
} = require('../controllers/workoutController'); // Import the workout controller

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts); // Use the getWorkouts function as a route handler

// GET a single workout
router.get('/:id', getWorkout); // Use the getWorkout function as a route handler

// POST a new workout
router.post('/', createWorkout); // Use the createWorkout function as a route handler

// DELETE a workout
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE a workout'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
  res.json({ message: 'UPDATE a new workout'})
})

module.exports = router;

