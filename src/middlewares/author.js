/* Middlewares de autores */

const { authorSchema } = require('../api/models/author')
const { validation } = require('../utils/validations/validation')

// Transformación de los datos de los autores antes de su validación
const preValidateAuthor = authorSchema.pre('validate', function (next) {
  // Normalización de cadena
  if (this.name != null) {
    this.name = validation.normalizeString(this.name)
  }

  // Normalización de cadena
  if (this.surnames != null) {
    this.surnames = validation.normalizeString(this.surnames)
  }

  next()
})

// Transformación de los datos de los autores después de su validación
const postValidateAuthor = authorSchema.post('validate', function () {
  // Eliminación de duplicados
  if (validation.isNotEmptyArray(this.books)) {
    this.books = validation.removeDuplicates(this.books)
  }
})

// Validación de los datos de los autores antes de su guardado
const preSaveAuthor = authorSchema.pre('save', async function (next) {
  // Validación de nombre y apellidos únicos
  const { Author } = require('../api/models/author')
  const author = await Author.findOne({
    name: validation.normalizeString(this.name),
    surnames: validation.normalizeString(this.surnames)
  })
  // No hay que tener en cuenta el identificador del propio autor
  if (author != null && author._id.toJSON() !== this._id.toJSON()) {
    return next(new Error(`name + surnames: ${validation.UNIQUE_MSG}`))
  }

  next()
})

module.exports = { preValidateAuthor, postValidateAuthor, preSaveAuthor }
