/* Middlewares de videojuegos */

const { videogameSchema } = require('../api/models/videogame')
const { validation } = require('../utils/validations/validation')

// Transformación de los datos de los videojuegos antes de su validación
const preValidateVideogame = videogameSchema.pre('validate', function (next) {
  if (this.title != null) {
    this.title = validation.normalizeString(this.title)
  }

  if (validation.isNotEmptyArray(this.genre)) {
    this.genre = validation.normalizeArray(this.genre)
  }

  if (this.description != null) {
    this.description = validation.normalizeString(this.description)
  }

  if (validation.isNotEmptyArray(this.pegiContent)) {
    this.pegiContent = validation.normalizeArray(this.pegiContent)
  }

  if (validation.isNotEmptyArray(this.platform)) {
    this.platform = validation.normalizeArray(this.platform)
  }

  next()
})

// Transformación de los datos de los videojuegos después de su validación
const postValidateVideogame = videogameSchema.post('validate', function () {
  if (validation.isNotEmptyArray(this.genre)) {
    this.genre = validation
      .removeDuplicates(this.genre)
      .sort(validation.sortAlphabetically)
  }

  if (validation.isNotEmptyArray(this.pegiContent)) {
    this.pegiContent = validation
      .removeDuplicates(this.pegiContent)
      .sort(validation.sortAlphabetically)
  }

  if (validation.isNotEmptyArray(this.platform)) {
    this.platform = validation
      .removeDuplicates(this.platform)
      .sort(validation.sortAlphabetically)
  }
})

module.exports = { preValidateVideogame, postValidateVideogame }
