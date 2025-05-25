/* Generación y validación de token para autorización de usuarios */

const jwt = require('jsonwebtoken')
// Permite cargar variables de entorno desde un archivo ".env"
require('dotenv').config()

// Devuelve un token generado mediante la clave secreta
const getJwtToken = (id, userName) => {
  return jwt.sign({ id, userName }, process.env.SECRET_KEY, {
    expiresIn: '15m'
  })
}

// Devuelve un token decodificado validándolo mediante la clave secreta
const getDecodedToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { getJwtToken, getDecodedToken }
