const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const user = {
        username: body.username,
        highestScore: body.highestScore,
        lastScore: body.lastScore,
        gamesPlayed: body.gamesPlayed

    }
    User.findByIdAndUpdate(request.params.id, user, { new: true })
        .then(updatedUser => {
            response.json(updatedUser)
        })
        .catch(error => next(error))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.username || !body.password) {
        return response.status(401).json({
            error: 'Missing Username or Password'
        })
    }
    const checkDupe = await User.find({ username: body.username })
    if (checkDupe) {
        return response.status(403).json({
            error: 'Username Already Exists'
        })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = User({
        username: body.username,
        passwordHash,
        highestScore: 0,
        lastScore: 0,
        gamesPlayed: 0
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter