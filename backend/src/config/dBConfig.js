
const mongoose = require('mongoose')
const dbConfig = 'mongodb+srv://pdr606:pdradmin@cluster0.uq0mc8b.mongodb.net/annotations?retryWrites=true&w=majority'

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedToPology: true,
})

module.exports = connection
