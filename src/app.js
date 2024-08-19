//paso 1, instalo express, dotenv, defino puerto, lo escucho, 

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { config } = require('dotenv')
config()

const bookRoutes = require('./routes/book.routes')

//uso express para los middleware
const app = express()

//middleware para parsear el body
app.use(bodyParser.json())

//conecto base de datos 
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection
//si es /books busca ruta de libros, sino busca otra ruta 
app.use('/books', bookRoutes)

//dar de alta base de datos

//defino puerto
const port = process.env.PORT || 3000

//para escuchar el puerto y ver si funciona
app.listen(port, () => {
    console.log(`servidor en el puerto ${port}`);
})