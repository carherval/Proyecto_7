/* Modelo de datos de videojuegos */

const mongoose = require('mongoose')
const { validation } = require('../../utils/validations/validation')
const videogameModelName = (videogameCollectionName = 'videogame')

// Géneros
const GENRES = {
  action: 'Acción',
  arcade: 'Arcade',
  adventure: 'Aventura',
  graphicAdventure: 'Aventura gráfica',
  racing: 'Carreras',
  sports: 'Deporte',
  shooter: 'Disparos',
  strategy: 'Estrategia',
  fighting: 'Lucha',
  sandbox: 'Mundo abierto',
  music: 'Musical',
  platform: 'Plataformas',
  puzzle: 'Puzle',
  rolePlaying: 'Rol',
  stealth: 'Sigilo',
  simulation: 'Simulación',
  survival: 'Supervivencia',
  fear: 'Terror'
}

// Etiquetas de edad PEGI
const PEGI_AGE = {
  3: 3,
  7: 7,
  12: 12,
  16: 16,
  18: 18
}

// Descriptores de contenido PEGI
const PEGI_CONTENT_DESCRIPTORS = {
  discrimination: 'Discriminación',
  drugs: 'Drogas',
  purchase: 'Incluye compras',
  gambling: 'Juego',
  lenguage: 'Lenguaje soez',
  fear: 'Miedo',
  sex: 'Sexo',
  violence: 'Violencia'
}

// Plataformas
const PLATFORMS = {
  mobile: 'Android / iOS',
  nintendo: 'Nintendo',
  pc: 'PC',
  ps: 'PlayStation',
  xbox: 'Xbox'
}

// Esquema
const videogameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      unique: [true, `title: ${validation.UNIQUE_MSG}`]
    },
    genre: {
      type: [String],
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      validate: {
        validator: validation.isNotEmptyArray,
        message: validation.MANDATORY_MSG
      },
      enum: {
        values: Object.values(GENRES),
        message: `${
          validation.COMMA_SEPARATED_ALLOWED_VALUES_MSG
        }: ${validation.getObjectValues(GENRES)}`
      }
    },
    description: { type: String, trim: true },
    releaseDate: {
      type: String,
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      validate: [
        {
          validator: validation.isFormattedDate,
          message: validation.DATE_FORMAT_MSG
        },
        {
          validator: validation.isValidDate,
          message: validation.INVALID_DATE_MSG
        }
      ]
    },
    pegiAge: {
      type: Number,
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      validate: {
        validator: validation.isNumber,
        message: validation.INVALID_NUMBER_MSG
      },
      enum: {
        values: Object.values(PEGI_AGE),
        message: `${
          validation.ALLOWED_VALUES_MSG
        }: ${validation.getObjectValues(PEGI_AGE)}`
      }
    },
    pegiContent: {
      type: [String],
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      validate: {
        validator: validation.isNotEmptyArray,
        message: validation.MANDATORY_MSG
      },
      enum: {
        values: Object.values(PEGI_CONTENT_DESCRIPTORS),
        message: `${
          validation.COMMA_SEPARATED_ALLOWED_VALUES_MSG
        }: ${validation.getObjectValues(PEGI_CONTENT_DESCRIPTORS)}`
      }
    },
    platform: {
      type: [String],
      trim: true,
      required: [true, validation.MANDATORY_MSG],
      validate: {
        validator: validation.isNotEmptyArray,
        message: validation.MANDATORY_MSG
      },
      enum: {
        values: Object.values(PLATFORMS),
        message: `${
          validation.COMMA_SEPARATED_ALLOWED_VALUES_MSG
        }: ${validation.getObjectValues(PLATFORMS)}`
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = { videogameSchema }

// Middlewares
const {
  preValidateVideogame,
  postValidateVideogame
} = require('../../middlewares/videogame')
preValidateVideogame
postValidateVideogame

// Modelo, esquema y colección de los videojuegos
// Si no se especifica, por defecto, la colección es el plural del modelo
const Videogame = mongoose.model(
  videogameModelName,
  videogameSchema,
  videogameCollectionName
)

module.exports = {
  GENRES,
  PEGI_AGE,
  PEGI_CONTENT_DESCRIPTORS,
  PLATFORMS,
  Videogame
}
