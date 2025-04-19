/* Funcionalidades para validación */

const MIN_YEAR = 1970

const MANDATORY_MSG = 'El campo es obligatorio y no puede estar vacío'
const UNIQUE_MSG = 'El campo no puede estar repetido'
const ALLOWED_VALUES_MSG = 'Valores válidos'
const COMMA_SEPARATED_ALLOWED_VALUES_MSG =
  'Valores válidos (separados por comas)'
const DATE_FORMAT_MSG = 'Formato correcto: dd/mm/yyyy'
const YEAR_FORMAT_MSG = 'Formato correcto: yyyy'
const INVALID_DATE_MSG = 'Fecha no válida'
const INVALID_YEAR_MSG = `El año debe ser a partir de ${MIN_YEAR}`
const INVALID_NUMBER_MSG = 'Número no válido'
const INVALID_WEBSITE_MSG = 'Website no válido'
const INVALID_ID_MSG = 'Identificador no válido'
const LINE_BREAK = '<br /><br />'
const CONSOLE_LINE_BREAK = '\n'

const getVideogameDoesNotExistMsg = (collectionName) => {
  return `Alguno de los videojuegos no existe en la colección "${collectionName}"`
}

const getVideogameWithDevMsg = (collectionName, lineBreak) => {
  return `Alguno de los videojuegos ya tiene relacionado un desarrollador en la colección "${collectionName}"${lineBreak}Un videojuego sólo puede pertenecer a un desarrollador`
}

// Devuelve si un array existe y no está vacío
const isNotEmptyArray = (array) => {
  return array != null && array.length > 0
}

// Devuelve si una fecha tiene el formato correcto
const isFormattedDate = (date) => {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(date)
}

// Devuelve si un año tiene el formato correcto
const isYear = (year) => {
  return /^\d{4}$/.test(year)
}

// Devuelve si un año es bisiesto
const isLeapYear = (year) => {
  return !isYear(year)
    ? false
    : year % 400 === 0
    ? true
    : year % 100 === 0
    ? false
    : year % 4 === 0
}

// Devuelve si una fecha es válida
const isValidDate = (date) => {
  const [day, month, year] = date.split('/').map((value) => parseInt(value, 10))

  return month === 2 && (day < 29 || (day === 29 && isLeapYear(year)))
    ? true
    : day < 31 && month <= 12 && month !== 2
    ? true
    : day === 31 && [1, 3, 5, 7, 8, 10, 12].includes(month)
    ? true
    : false
}

// Devuelve si un año es válido
const isValidYear = (year) => {
  return year >= MIN_YEAR
}

// Devuelve si un valor es numérico
const isNumber = (value) => {
  return /^\d{1,}$/.test(value)
}

// Devuelve si un website es válido
const isWebsite = (website) => {
  return /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/.test(
    website
  )
}

// Devuelve los valores de un objeto en forma de cadena separados por un separador
const getObjectValues = (object, separator = ' - ') => {
  return Object.values(object).join(separator)
}

// Devuelve los elementos de un array ordenados alfabéticamente ignorando tildes, minúsculas y mayúsculas
const sortAlphabetically = (elem1, elem2) => {
  return elem1.localeCompare(elem2, 'en', { sensitivity: 'base' })
}

// Devuelve los videojuegos ordenados alfabéticamente por título ignorando tildes, minúsculas y mayúsculas
const sortVideogames = (videogame1, videogame2) => {
  return videogame1.title.localeCompare(videogame2.title, 'en', {
    sensitivity: 'base'
  })
}

// Devuelve los desarrolladores ordenados alfabéticamente por nombre ignorando tildes, minúsculas y mayúsculas
const sortDevelopers = (developer1, developer2) => {
  return developer1.name.localeCompare(developer2.name, 'en', {
    sensitivity: 'base'
  })
}

// Devuelve una cadena normalizada
// Elimina espacios innecesarios y normaliza signos de puntuación
const normalizeString = (string) => {
  return string
    .replace(/[.,:-]/g, '$& ')
    .replace(/\s+/g, ' ')
    .replace(/\s[.,:-]/g, (match) => match.trim())
    .trim()
}

// Devuelve un array normalizado
// Permite la entrada de datos en un modelo para un campo de tipo array mediante una cadena separada por comas
const normalizeArray = (array) => {
  return array
    .toString()
    .split(',')
    .map((elem) => elem.trim())
}

// Devuelve un array eliminando los elementos duplicados
// Se pasan los elementos a cadena porque en un array de "ObjectId" se comparan sus referencias en memoria y no sus valores (las referencias en memoria son siempre diferentes aunque tengan el mismo valor)
const removeDuplicates = (array) => {
  return Array.from(new Set(array.map((elem) => elem.toString())))
}

// Devuelve una expresión regular ignorando tildes, minúsculas y mayúsculas
const getIgnoreAccentCaseText = (string) => {
  return new RegExp(string.normalize('NFD').replace(/\p{Diacritic}/gu, ''), 'i')
}

// Devuelve un mensaje de error formateado
const formatErrorMsg = (msg) => {
  return msg.replaceAll("', '", "','").replaceAll(', ', LINE_BREAK)
}

const validation = {
  MANDATORY_MSG,
  UNIQUE_MSG,
  ALLOWED_VALUES_MSG,
  COMMA_SEPARATED_ALLOWED_VALUES_MSG,
  DATE_FORMAT_MSG,
  YEAR_FORMAT_MSG,
  INVALID_DATE_MSG,
  INVALID_YEAR_MSG,
  INVALID_NUMBER_MSG,
  INVALID_WEBSITE_MSG,
  INVALID_ID_MSG,
  LINE_BREAK,
  CONSOLE_LINE_BREAK,
  getVideogameDoesNotExistMsg,
  getVideogameWithDevMsg,
  isNotEmptyArray,
  isFormattedDate,
  isYear,
  isLeapYear,
  isValidDate,
  isValidYear,
  isNumber,
  isWebsite,
  getObjectValues,
  sortAlphabetically,
  sortVideogames,
  sortDevelopers,
  normalizeString,
  normalizeArray,
  removeDuplicates,
  getIgnoreAccentCaseText,
  formatErrorMsg
}

module.exports = { validation }
