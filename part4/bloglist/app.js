const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)

app.use('/api/blogs', blogsRouter)

module.exports = app