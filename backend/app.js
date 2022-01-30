const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const highScoreRouter = require('./controllers/highscore')
const UsersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())

app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/highscores', highScoreRouter)
app.use('/api/users', UsersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app