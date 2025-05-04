/* Datos para la semilla de autores */

const { books } = require('./book')

const authors = [
  {
    name: 'Gabriel',
    surnames: 'García Márquez',
    birthYear: 1927,
    books: [books[0].title, books[1].title]
  },
  {
    name: 'Jane',
    surnames: 'Austen',
    birthYear: 1775,
    books: [books[2].title, books[3].title]
  },
  {
    name: 'Haruki',
    surnames: 'Murakami',
    birthYear: 1949,
    books: [books[4].title, books[5].title]
  },
  {
    name: 'León',
    surnames: 'Tolstói',
    birthYear: 1828,
    books: [books[6].title, books[7].title]
  },
  {
    name: 'Virginia',
    surnames: 'Woolf',
    birthYear: 1882,
    books: [books[8].title, books[9].title]
  }
]

module.exports = { authors }
