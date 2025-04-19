/* Semilla de datos de videojuegos y desarrolladores */

const mongoose = require('mongoose')
const { Videogame } = require('../../api/models/videogame')
const videogameCollectionName = Videogame.collection.name
const { Developer } = require('../../api/models/developer')
const developerCollectionName = Developer.collection.name
const { validation } = require('../validations/validation')

// Crea los videojuegos y los desarrolladores en ambas colecciones
const createData = async () => {
  // Permite cargar variables de entorno desde un archivo ".env"
  require('dotenv').config()
  const dbUrl = process.env.DB_URL
  const dbName = dbUrl.substring(dbUrl.lastIndexOf('/') + 1, dbUrl.indexOf('?'))

  try {
    console.log(
      `Se van a generar los datos en la colecciones "${videogameCollectionName}" y "${developerCollectionName}"`
    )

    await mongoose.connect(dbUrl)
    console.log(
      `Conexión con la Base de Datos "${dbName}" realizada correctamente`
    )

    await Developer.collection.drop()
    console.log(
      `Se han eliminado los datos antiguos en la colección "${developerCollectionName}"`
    )

    await Videogame.collection.drop()
    console.log(
      `Se han eliminado los datos antiguos en la colección "${videogameCollectionName}"`
    )

    try {
      const { videogames } = require('../../data/videogame')
      await Videogame.insertMany(videogames)
      console.log(
        `Se han creado los nuevos datos en la colección "${videogameCollectionName}"`
      )
    } catch (error) {
      throw new Error(
        `Se ha producido un error durante la carga de los datos en la colección "${videogameCollectionName}":${validation.CONSOLE_LINE_BREAK}${error}`
      )
    }

    try {
      const { developers } = require('../../data/developer')

      // Los datos de cada desarrollador hacen referencia al título de sus videojuegos
      // Se hace la búsqueda por título de cada videoujego y se asocia su identificador al desarrollador
      for (const developer of developers) {
        if (developer.videogames.length > 0) {
          developer.videogames = await Promise.all(
            validation
              .normalizeArray(developer.videogames)
              .map(async (title) => {
                const videogame = await Videogame.findOne({
                  title: validation.normalizeString(title)
                })

                return videogame != null ? videogame._id : null
              })
          )

          // Se comprueba si algún videojuego no existe en la colección
          if (developer.videogames.filter((id) => id == null).length > 0) {
            throw new Error(
              validation.getVideogameDoesNotExistMsg(videogameCollectionName)
            )
          }
        } else {
          developer.videogames = []
        }
      }

      // Se eliminan los posibles duplicados del array de videojuegos de cada desarrollador y se concatenan en un mismo array
      const videogames = developers.reduce(
        (acc, developer) =>
          acc.concat(validation.removeDuplicates(developer.videogames)),
        []
      )

      // Se comprueba si algún videojuego ya pertenece a otro desarrollador (eliminando los posibles duplicados del array resultante anterior)
      // Al no existir ningún desarrollador (ya que se insertan todos a la vez con "insertMany"), no se puede comprobar en la validación del modelo
      if (
        videogames.length !== validation.removeDuplicates(videogames).length
      ) {
        throw new Error(
          validation.getVideogameWithDevMsg(
            developerCollectionName,
            validation.CONSOLE_LINE_BREAK
          )
        )
      }

      await Developer.insertMany(developers)
      console.log(
        `Se han creado los nuevos datos en la colección "${developerCollectionName}"`
      )
    } catch (error) {
      throw new Error(
        `Se ha producido un error durante la carga de los datos en la colección "${developerCollectionName}":${validation.CONSOLE_LINE_BREAK}${error}`
      )
    }
  } catch (error) {
    console.log(
      `Se ha producido un error durante la carga de los datos:${validation.CONSOLE_LINE_BREAK}${error}`
    )
  } finally {
    await mongoose.disconnect()
    console.log(
      `Se ha realizado la desconexión con la Base de Datos "${dbName}"`
    )
  }
}

createData()
