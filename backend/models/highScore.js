const mongoose = require('mongoose')

const highScoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    score: {
        type: String,
        required: true
    }
})

highScoreSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('HighScore', highScoreSchema)