/* Rutas de videojuegos */

// Enrutador para los "endpoints" de los videojuegos
const videogameRouter = require('express').Router()
const { videogameController } = require('../controllers/videogame')

videogameRouter.get('/', videogameController.getVideogames)
videogameRouter.get('/id/:id', videogameController.getVideogameById)
videogameRouter.get('/title/:title', videogameController.getVideogamesByTitle)
videogameRouter.get('/genre/:genre', videogameController.getVideogamesByGenre)
videogameRouter.get(
  '/pegi-age/:pegiAge',
  videogameController.getVideogamesByPegiAge
)
videogameRouter.get(
  '/pegi-content/:pegiContent',
  videogameController.getVideogamesByPegiContent
)
videogameRouter.get(
  '/platform/:platform',
  videogameController.getVideogamesByPlatform
)
videogameRouter.get(
  '/developer-name/:name',
  videogameController.getVideogamesByDeveloperName
)
videogameRouter.post('/', videogameController.createVideogame)
videogameRouter.put('/:id', videogameController.updateVideogame)
videogameRouter.delete('/:id', videogameController.deleteVideogame)

module.exports = { videogameRouter }
