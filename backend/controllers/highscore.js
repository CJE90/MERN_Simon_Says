const highScoreRouter = require('express').Router()
const HighScore = require('../models/highScore')

highScoreRouter.get('/', (request, response) => {
    HighScore.find({}).then(scores => {
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