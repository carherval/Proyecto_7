/* Middlewares de desarrolladores */

const { developerSchema } = require('../api/models/developer')
const { validation } = require('../utils/validations/validation')

// Transformación de los datos de los desarrolladores antes de su validación
const preValidateDeveloper = developerSchema.pre('validate', function (next) {
  if (this.name != null) {
    this.name = validation.normalizeString(this.name)
  }

  if (this.founder != null) {
    this.founder = validation.normalizeString(this.founder)
  }

  if (this.headquarters != null) {
    this.headquarters = validation.normalizeString(this.headquarters)
  }

  next()
})

// Transformación de los datos de los desarrolladores después de su validación
const postValidateDeveloper = developerSchema.post('validate', function () {
  if (validation.isNotEmptyArray(this.videogames)) {
    this.videogames = validation.removeDuplicates(this.videogames)
  }
})

module.exports = { preValidateDeveloper, postValidateDeveloper }
