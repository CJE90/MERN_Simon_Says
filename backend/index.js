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

app.get('/api/highscores/:id', (request, response) => {
    const id = Number(request.params.id)
    const highScore = highScores.find(score => score.id === id)
    if (highScore) {
        response.json(highScore)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/highscores/:id', (request, response) => {
    const id = Number(request.params.id)
    highScores = highScores.filter(score => score.id !== id)

    response.status(204).end()
})



app.post('/api/highscores', (request, response) => {
    const maxId = highScores.length > 0
        ? Math.max(...highScores.map(s => s.id))
        : 0

    const score = request.body

    if (!score.username || score.score) {
        return response.status(400).json({
            error: 'Username or Score is missing'
        })
    }

    score.id = maxId + 1

    highScores = highScores.concat(score)

    response.json(score)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})