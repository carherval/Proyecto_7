/* Datos para la semilla de videojuegos */

const {
  GENRES,
  PEGI_AGE,
  PEGI_CONTENT_DESCRIPTORS,
  PLATFORMS
} = require('../api/models/videogame')

const videogames = [
  {
    title: 'Fallout 4',
    genre: [GENRES.action, GENRES.rolePlaying],
    description:
      'Sobrevive en un mundo post-apocalíptico lleno de mutantes y peligros',
    releaseDate: '10/11/2015',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.drugs,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.pc, PLATFORMS.ps, PLATFORMS.xbox]
  },
  {
    title: 'The Elder Scrolls V: Skyrim',
    genre: [GENRES.action, GENRES.rolePlaying],
    description: 'Un vasto mundo de fantasía lleno de dragones y magia',
    releaseDate: '11/11/2011',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.lenguage,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.nintendo, PLATFORMS.pc, PLATFORMS.ps, PLATFORMS.xbox]
  },
  {
    title: 'Amnesia: The Dark Descent',
    genre: [GENRES.adventure, GENRES.survival, GENRES.fear],
    description:
      'Juego de terror psicológico en el que los jugadores deben explorar un oscuro castillo mientras evitan criaturas aterradoras y resuelven acertijos',
    releaseDate: '08/09/2010',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.fear,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.nintendo, PLATFORMS.pc, PLATFORMS.ps, PLATFORMS.xbox]
  },
  {
    title: 'SOMA',
    genre: [GENRES.survival, GENRES.fear],
    description:
      'Juego de terror y ciencia ficción que explora la conciencia y la identidad en un entorno submarino lleno de misterios y horrores',
    releaseDate: '22/09/2015',
    pegiAge: PEGI_AGE[16],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.fear,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.pc, PLATFORMS.ps]
  },
  {
    title: 'The Last of Us',
    genre: [GENRES.action, GENRES.adventure, GENRES.shooter, GENRES.fear],
    description: 'Un viaje emocional a través de un mundo post-apocalíptico',
    releaseDate: '14/06/2013',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.fear,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.ps]
  },
  {
    title: 'Uncharted 4: El Desenlace del Ladrón',
    genre: [GENRES.action, GENRES.adventure, GENRES.shooter],
    description:
      'La última aventura de Nathan Drake en busca de tesoros perdidos',
    releaseDate: '10/05/2016',
    pegiAge: PEGI_AGE[16],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.lenguage,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.pc, PLATFORMS.ps]
  },
  {
    title: 'Outlast',
    genre: [GENRES.survival, GENRES.fear],
    description:
      'Juego de terror en primera persona en un manicomio abandonado',
    releaseDate: '04/09/2013',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.fear,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [
      PLATFORMS.mobile,
      PLATFORMS.nintendo,
      PLATFORMS.pc,
      PLATFORMS.ps,
      PLATFORMS.xbox
    ]
  },
  {
    title: 'Outlast 2',
    genre: [GENRES.survival, GENRES.fear],
    description:
      'Juego de terror en primera persona que sigue a Blake Langermann, un periodista que investiga los eventos oscuros en una zona rural de Arizona',
    releaseDate: '25/04/2017',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.fear,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.nintendo, PLATFORMS.pc, PLATFORMS.ps, PLATFORMS.xbox]
  },
  {
    title: 'Grand Theft Auto V',
    genre: [GENRES.action, GENRES.adventure, GENRES.shooter, GENRES.sandbox],
    description: 'Un mundo abierto lleno de crimen y caos en Los Santos',
    releaseDate: '17/09/2013',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.drugs,
      PEGI_CONTENT_DESCRIPTORS.lenguage,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.pc, PLATFORMS.ps, PLATFORMS.xbox]
  },
  {
    title: 'Red Dead Redemption 2',
    genre: [GENRES.action, GENRES.adventure, GENRES.shooter, GENRES.sandbox],
    description: 'Una historia épica de forajidos en el ocaso del Viejo Oeste',
    releaseDate: '26/10/2018',
    pegiAge: PEGI_AGE[18],
    pegiContent: [
      PEGI_CONTENT_DESCRIPTORS.drugs,
      PEGI_CONTENT_DESCRIPTORS.violence
    ],
    platform: [PLATFORMS.pc, PLATFORMS.ps, PLATFORMS.xbox]
  }
]

module.exports = { videogames }
