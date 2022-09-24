const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 })

        res.status(200).json(workouts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// GET a single workout
const getWorkout = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Workout not found' })
        }

        const workout = await Workout.findById(id)

        if (!workout) {
            return res.status(404).json({ message: 'Cannot find workout' })
        }

        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// CREATE a workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []

    if (!title) emptyFields.push('title')
    if (!reps) emptyFields.push('reps')
    if (!load) emptyFields.push('load')
    if (emptyFields.length > 0) return res.status(400).json({ message: `Please fill in the following fields: ${emptyFields.join(', ')}`, emptyFields })

    try {
        const workout = await Workout.create({ title, reps, load })

        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Workout not found' })
        }

        const workout = await Workout.findByIdAndUpdate({ _id: id }, { title, reps, load }, { new: true })

        if (!workout) {
            return res.status(404).json({ message: 'Cannot find workout' })
        }

        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Workout not found' })
        }

        const workout = await Workout.findByIdAndDelete({ _id: id })

        if (!workout) {
            return res.status(404).json({ message: 'Cannot find workout' })
        }

        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}