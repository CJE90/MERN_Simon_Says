const highScoreRouter = require('express').Router()
const HighScore = require('../models/highScore')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.subString(7)
    }
    return null
}

highScoreRouter.get('/', (request, response) => {
    HighScore.find({}).then(scores => {
        console.log('getting score resource', scores)
        response.json(scores)
    })
})

highScoreRouter.get('/:id', (request, response, next) => {
    HighScore.findById(request.params.id).then(score => {
        if (score) {
            response.json(score)
        }
        else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

highScoreRouter.delete('/:id', (request, response, next) => {
    HighScore.findByIdAndRemove(request.params.id).then(result => {
        console.log(`resource deleted`)
        response.status(204).end()
    }).catch(error => next(error))
})


highScoreRouter.post('/', (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.username === undefined || body.score === undefined) {
        return response.status(400).json({ error: 'Username or Score missing' })
    }

    const score = new HighScore({
        username: body.username,
        score: body.score
    })

    score.save().then(savedScore => response.json(savedScore)).catch(error => {
        next(error)
    })
})


module.exports = highScoreRouter