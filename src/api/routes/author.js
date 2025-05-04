/* Rutas de autores */

// Enrutador para los "endpoints" de los autores
const authorRouter = require('express').Router()
const { authorController } = require('../controllers/author')

authorRouter.get('/', authorController.getAuthors)
authorRouter.get('/id/:id', authorController.getAuthorById)
authorRouter.get('/name/:name', authorController.getAuthorsByName)
authorRouter.get('/book-id/:id', authorController.getAuthorByBookId)
authorRouter.get('/book-title/:title', authorController.getAuthorsByBookTitle)
authorRouter.post('/', authorController.createAuthor)
authorRouter.put('/:id', authorController.updateAuthor)
authorRouter.delete('/:id', authorController.deleteAuthor)

module.exports = { authorRouter }
