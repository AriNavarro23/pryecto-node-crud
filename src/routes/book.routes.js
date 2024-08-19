//paso 3
const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

//MIDDLEWARE, recibe el response y luego configura el book, su funcion
const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      message: "El ID no es valido",
    });
  }
  try {
    book = await Book.findByID(id);
    if (!book) {
      //404 es notfound
      return res.status(404).json({
        message: "El libro no se encontro",
      });
    }
  } catch (error) {
    //500 falla la base de datos
    return res.status(500).json(
        {
            message:error.message
        }
    )
  }
  //configuro en la respuesta el book y continua con next
  res.book = book;
  next()
};

//obtener todos los libros "GET"
router.get("/", async (req, res) => {
  try {
    //busco libros
    const books = await Book.find();
    console.log("GET ALL", books);
    //si no hay tiro error 204 vacio
    if (books.length === 0) {
      return res.status(204).json([]);
    }
    //sino devuelvo libros
    res.json(books);
  } catch (error) {
    //manejo error 500 y devuelvo msj
    res.status(500).json({ message: error.message });
  }
});

//Crear un nuevo libro ( recursos) "POST"
router.post("/", async (req, res) => {
  const { title, author, genre, publication_date } = req?.body;

  if (!title || !author || !genre || !publication_date) {
    return res.status(400).json({
      message: "Los campos titulo, autor, genero, y fecha son oligatorios.",
    });
  }
  const book = new Book({
    title,
    author,
    genre,
    publication_date,
  });
  try {
    const newBook = await book.save();
    console.log(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

router.get('/:id', getBook, async(req,res) => {
  res.json(res.book)
})

module.exports = router;