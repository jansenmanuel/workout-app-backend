const express = require('express')

const {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// GET all workouts
router.get('/', getAllWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a workout
router.post('/', createWorkout)

// PATCH a workout
router.patch('/:id', updateWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

module.exports = router