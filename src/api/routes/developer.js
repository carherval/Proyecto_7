/* Rutas de desarrolladores */

// Enrutador para los "endpoints" de los desarrolladores
const developerRouter = require('express').Router()
const { developerController } = require('../controllers/developer')

developerRouter.get('/', developerController.getDevelopers)
developerRouter.get('/id/:id', developerController.getDeveloperById)
developerRouter.get('/name/:name', developerController.getDevelopersByName)
developerRouter.get(
  '/videogame-id/:id',
  developerController.getDeveloperByVideogameId
)
developerRouter.get(
  '/videogame-title/:title',
  developerController.getDevelopersByVideogameTitle
)
developerRouter.post('/', developerController.createDeveloper)
developerRouter.put('/:id', developerController.updateDeveloper)
developerRouter.delete('/:id', developerController.deleteDeveloper)

module.exports = { developerRouter }
