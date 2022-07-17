const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

const app = express()
mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to mongodb')
})
.catch((error) => {
    logger.error('error connection to mongodb', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app