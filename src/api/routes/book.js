/* Rutas de libros */

// Enrutador para los "endpoints" de los libros
const bookRouter = require('express').Router()
const { bookController } = require('../controllers/book')

bookRouter.get('/', bookController.getBooks)
bookRouter.get('/id/:id', bookController.getBookById)
bookRouter.get('/title/:title', bookController.getBooksByTitle)
bookRouter.get('/genre/:genre', bookController.getBooksByGenre)
bookRouter.get('/isbn/:isbn', bookController.getBooksByIsbn)
bookRouter.get('/author-name/:name', bookController.getBooksByAuthorName)
bookRouter.post('/', bookController.createBook)
bookRouter.put('/:id', bookController.updateBook)
bookRouter.delete('/:id', bookController.deleteBook)

module.exports = { bookRouter }
