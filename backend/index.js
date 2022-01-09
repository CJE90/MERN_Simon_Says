require('dotenv').config()
const express = require('express')
const app = express()
const HighScore = require('./models/highScore')
app.use(express.json())


//dummy data
let highScores = [
    {
        id: 1,
        username: "Aguy",
        score: "20",
    },
    {
        id: 2,
        username: "AGal",
        score: "40",
    },
    {
        id: 3,
        username: "the computer",
        score: "10",
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)


//Note: The first request parameter contains all of the information of the HTTP request
// the second response parameter is used to define how the request is responded to.

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/highscores', (request, response) => {
    HighScore.find({}).then(scores => {
        response.json(scores)
    })
})

app.get('/api/highscores/:id', (request, response, next) => {
    HighScore.findById(request.params.id).then(score => {
        if (score) {
            response.json(score)
        }
        else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/highscores/:id', (request, response) => {
    HighScore.findByIdAndRemove(request.params.id).then(result => {
        console.log(`resource deleted`)
        response.status(204).end()
    }).catch(error => next(error))
})



app.post('/api/highscores', (request, response) => {
    const body = request.body

    if (body.username === undefined || body.score === undefined) {
        return response.status(400).json({ error: 'Username or Score missing' })
    }

    const score = new HighScore({
        username: body.username,
        score: body.score
    })

    score.save().then(savedScore => response.json(savedScore))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})