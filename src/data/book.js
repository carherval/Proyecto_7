/* Datos para la semilla de libros */

const { GENRES } = require('../api/models/book')

const books = [
  // García Márquez
  {
    title: 'Cien años de soledad',
    genre: GENRES.narrative,
    isbn: '9788437604947',
    publicationDate: '30/05/1967',
    numCopies: 5,
    abstract:
      'Una saga familiar que abarca varias generaciones en el pueblo ficticio de Macondo'
  },
  {
    title: 'El amor en los tiempos del cólera',
    genre: GENRES.romance,
    isbn: '9780307389732',
    publicationDate: '05/09/1985',
    numCopies: 3,
    abstract:
      'Una historia de amor que perdura a lo largo de décadas en un Caribe imaginario'
  },
  // Jane Austen
  {
    title: 'Orgullo y prejuicio',
    genre: GENRES.literature,
    isbn: '9788491050524',
    publicationDate: '28/01/1813',
    numCopies: 4,
    abstract:
      'Una novela clásica sobre el amor, el orgullo y los prejuicios en la sociedad inglesa del siglo XIX'
  },
  {
    title: 'Sentido y sensibilidad',
    genre: GENRES.literature,
    isbn: '9788491050531',
    publicationDate: '01/11/1811',
    numCopies: 2,
    abstract:
      'Una historia que explora las emociones y las decisiones en tiempos de cambio social'
  },
  // Haruki Murakami
  {
    title: 'Norwegian Wood',
    genre: GENRES.narrative,
    isbn: '9780375704024',
    publicationDate: '04/09/1987',
    numCopies: 5,
    abstract:
      'Una novela introspectiva sobre el amor, la pérdida y la madurez en Tokio'
  },
  {
    title: 'Kafka en la orilla',
    genre: GENRES.narrative,
    isbn: '9788497592208',
    publicationDate: '12/09/2002',
    numCopies: 4,
    abstract:
      'Una historia surrealista que mezcla lo real y lo fantástico en Japón'
  },
  // Tolstoi
  {
    title: 'Guerra y paz',
    genre: GENRES.historical,
    isbn: '9788491051232',
    publicationDate: '01/01/1869',
    numCopies: 3,
    abstract:
      'Una épica novela que explora la vida en Rusia durante las guerras napoleónicas'
  },
  {
    title: 'Anna Karenina',
    genre: GENRES.narrative,
    isbn: '9788491051249',
    publicationDate: '01/01/1877',
    numCopies: 2,
    abstract:
      'Una historia de amor, infidelidad y sociedad en la Rusia del siglo XIX'
  },
  // Virginia Woolf
  {
    title: 'Mrs Dalloway',
    genre: GENRES.narrative,
    isbn: '9780156628709',
    publicationDate: '14/05/1925',
    numCopies: 5,
    abstract:
      'Un día en la vida de Clarissa Dalloway, explorando la mente y las emociones humanas'
  },
  {
    title: 'Al faro',
    genre: GENRES.narrative,
    isbn: '9780156907392',
    publicationDate: '05/05/1927',
    numCopies: 3,
    abstract:
      'Una reflexión sobre el tiempo, la memoria y las relaciones humanas'
  }
]

module.exports = { books }
