//paso 2, instalo mongoose, defino libro
const mongoose = require('mongoose')

//defino como quiero que sean los objetos ( libros )
const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        genre: String,
        publication_date: String,
    }
)

module.exports = mongoose.model('book', bookSchema)