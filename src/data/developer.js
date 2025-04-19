/* Datos para la semilla de desarrolladores */

const { videogames } = require('./videogame')

const developers = [
  {
    name: 'Bethesda Game Studios',
    foundationYear: '2001',
    founder: 'Christopher Weaver',
    headquarters: 'Rockville, Maryland, USA',
    website: 'https://bethesdagamestudios.com',
    videogames: [videogames[0].title, videogames[1].title]
  },
  {
    name: 'Frictional Games',
    foundationYear: '2007',
    founder: 'Thomas Grip, Jens Nilsson',
    headquarters: 'Lund, Sweden',
    website: 'https://frictionalgames.com',
    videogames: [videogames[2].title, videogames[3].title]
  },
  {
    name: 'Naughty Dog',
    foundationYear: '1984',
    founder: 'Andy Gavin, Jason Rubin',
    headquarters: 'Santa Monica, California, USA',
    website: 'https://www.naughtydog.com',
    videogames: [videogames[4].title, videogames[5].title]
  },
  {
    name: 'Red Barrels',
    foundationYear: '2011',
    founder: 'Philippe Morin, David Chateauneuf, Hugo Dallaire',
    headquarters: 'Montreal, Quebec, Canada',
    website: 'https://redbarrelsgames.com',
    videogames: [videogames[6].title, videogames[7].title]
  },
  {
    name: 'Rockstar Games',
    foundationYear: '1998',
    founder: 'Sam Houser, Dan Houser, Terry Donovan, Gary Foreman',
    headquarters: 'New York City, New York, USA',
    website: 'https://www.rockstargames.com',
    videogames: [videogames[8].title, videogames[9].title]
  }
]

module.exports = { developers }
