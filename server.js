require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')

// Create express app
const app = express()

// Middleware
app.use(express.json())
app.use((res, req, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // Listen on port
        app.listen(process.env.PORT, () => {
            console.log(`Connected to MongoDB & Workout app listening at http://localhost:${process.env.PORT}`)
        })
    }).catch((err) => {
        console.log(err)
    })