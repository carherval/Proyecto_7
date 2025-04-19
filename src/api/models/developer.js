/* Modelo de datos de desarrolladores */

const mongoose = require('mongoose')
const { Videogame } = require('./videogame')
const videogameCollectionName = Videogame.collection.name
const { validation } = require('../../utils/validations/validation')
const developerModelName = (developerCollectionName = 'developer')

// Esquema
const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      unique: [true, `name: ${validation.UNIQUE_MSG}`]
    },
    foundationYear: {
      type: String,
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      validate: [
        {
          validator: validation.isYear,
          message: validation.YEAR_FORMAT_MSG
        },
        {
          validator: validation.isValidYear,
          message: validation.INVALID_YEAR_MSG
        }
      ]
    },
    founder: { type: String, trim: true },
    headquarters: { type: String, trim: true },
    website: {
      type: String,
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      validate: {
        validator: validation.isWebsite,
        message: validation.INVALID_WEBSITE_MSG
      },
      unique: [true, `website: ${validation.UNIQUE_MSG}`]
    },
    videogames: {
      ref: videogameCollectionName,
      type: [mongoose.Types.ObjectId],
      trim: true,
      validate: [
        // Valida si los videojuegos del array existen en la colección
        {
          validator: async function (videogames) {
            const videogameCounter = (
              await Promise.all(
                videogames.map((id) =>
                  Videogame.countDocuments({ _id: { $in: id } })
                )
              )
            ).reduce((acc, count) => acc + count, 0)

            return videogameCounter === videogames.length
          },
          message: validation.getVideogameDoesNotExistMsg(
            videogameCollectionName
          )
        },
        // Valida si los videojuegos del array no pertenecen a otro desarrollador
        {
          validator: async function (videogames) {
            const {
              getDeveloperByVideogameIdValidator
            } = require('../controllers/developer')

            return (
              (
                await Promise.all(
                  videogames.map(async (id) => {
                    const developer = await getDeveloperByVideogameIdValidator(
                      id
                    )

                    // No hay que tener en cuenta el identificador del propio desarrollador
                    return (
                      developer != null &&
                      developer._id.toJSON() !== this._id.toJSON()
                    )
                  })
                )
              ).filter((hasDeveloper) => hasDeveloper).length === 0
            )
          },
          message: validation.getVideogameWithDevMsg(
            developerCollectionName,
            validation.LINE_BREAK
          )
        }
      ]
    }
  },
  {
    timestamps: true
  }
)

module.exports = { developerSchema }

// Middlewares
const {
  preValidateDeveloper,
  postValidateDeveloper
} = require('../../middlewares/developer')
preValidateDeveloper
postValidateDeveloper

// Modelo, esquema y colección de los desarrolladores
// Si no se especifica, por defecto, la colección es el plural del modelo
const Developer = mongoose.model(
  developerModelName,
  developerSchema,
  developerCollectionName
)

module.exports = { Developer }
