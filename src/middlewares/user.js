/* Middlewares de usuarios */

const { userSchema } = require('../api/models/user')
const { validation } = require('../utils/validations/validation')

// Transformación de los datos de los usuarios antes de su validación
const preValidateUser = userSchema.pre('validate', function (next) {
  // Normalización de nombre de usuario
  if (this.userName != null) {
    this.userName = validation.normalizeUserName(this.userName)
  }

  // Normalización de cadena
  if (this.rol != null) {
    this.rol = validation.normalizeString(this.rol)
  }

  next()
})

// Transformación de los datos de los usuarios después de su validación
const postValidateUser = userSchema.post('validate', function () {
  // Eliminación de duplicados
  if (validation.isNotEmptyArray(this.books)) {
    this.books = validation.removeDuplicates(this.books)
  }
})

module.exports = { preValidateUser, postValidateUser }
