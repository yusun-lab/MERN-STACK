const mongoose = require('mongoose'); // Import mongoose for MongoDB object modeling

const Schema = mongoose.Schema; // Get the Schema constructor from mongoose

const workoutSchema = new Schema({ // Define a new schema for workouts
  title: {
    type: String,
    required: true, // Title is required
  }, 
  reps: {
    type: Number,
    required: true, // Repeats are required
  }, 
  load: {
    type: Number,
    required: true, // Load is required
  }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Workout', workoutSchema); // Export the model based on the schema. Workout is singular, but the collection in MongoDB will be pluralized to 'workouts' by Mongoose.
// This model can be used to interact with the 'workout' collection in the MongoDB database.
// A model is a constructor function, and its name usually starts with a capital letter.