/* Controladores de videojuegos */

const mongoose = require('mongoose')
const { Videogame } = require('../models/videogame')
const videogameCollectionName = Videogame.collection.name
const { Developer } = require('../models/developer')
const { validation } = require('../../utils/validations/validation')
const moment = require('moment')

const getVideogameNotFoundByIdMsg = (id) => {
  return `No se ha encontrado ningún videojuego en la colección "${videogameCollectionName}" con el identificador "${id}"`
}

// Devuelve un videojuego añadiendo a su información el nombre de su desarrollador y las fechas formateadas
const getVideogameWithDeveloper = async (videogame) => {
  if (videogame != null) {
    const developer = await Developer.findOne({
      videogames: { $in: videogame._id }
    })

    videogame = videogame.toObject()
    videogame.developer = developer?.name ?? ''

    videogame.createdAt = moment(videogame.createdAt).format(
      'DD/MM/YYYY HH:mm:ss'
    )
    videogame.updatedAt = moment(videogame.updatedAt).format(
      'DD/MM/YYYY HH:mm:ss'
    )
  }

  return videogame
}

// Devuelve los videojuegos añadiendo a su información el nombre de su desarrollador y las fechas formateadas
const getVideogamesWithDeveloper = async (videogames) => {
  return await Promise.all(
    videogames.map((videogame) => getVideogameWithDeveloper(videogame))
  )
}

// Devuelve todos los videojuegos ordenados alfabéticamente por título
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogames = async (req, res, next) => {
  try {
    const videogames = (
      await getVideogamesWithDeveloper(await Videogame.find())
    ).sort(validation.sortVideogames)

    if (videogames.length > 0) {
      return res.status(200).send(videogames)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado videojuegos en la colección "${videogameCollectionName}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar los videojuegos en la colección "${videogameCollectionName}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve un videojuego mediante su identificador
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogameById = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const videogame = await getVideogameWithDeveloper(
      await Videogame.findById(id)
    )

    if (videogame != null) {
      return res.status(200).send(videogame)
    } else {
      return res.status(404).send(getVideogameNotFoundByIdMsg(id))
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${videogameCollectionName}" el videojuego con el identificador "${id}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los videojuegos filtrados por título y ordenados alfabéticamente por título
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogamesByTitle = async (req, res, next) => {
  const title = validation.normalizeString(req.params.title)

  try {
    const videogames = (
      await getVideogamesWithDeveloper(
        await Videogame.find({
          title: validation.getIgnoreAccentCaseText(title)
        })
      )
    ).sort(validation.sortVideogames)

    if (videogames.length > 0) {
      return res.status(200).send(videogames)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado videojuegos en la colección "${videogameCollectionName}" cuyo título contenga "${title}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${videogameCollectionName}" los videojuegos cuyo título contenga "${title}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los videojuegos filtrados por género y ordenados alfabéticamente por título
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogamesByGenre = async (req, res, next) => {
  const genre = validation.normalizeString(req.params.genre)

  try {
    const videogames = (
      await getVideogamesWithDeveloper(
        await Videogame.find({
          genre: { $in: validation.getIgnoreAccentCaseText(genre) }
        })
      )
    ).sort(validation.sortVideogames)

    if (videogames.length > 0) {
      return res.status(200).send(videogames)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado videojuegos en la colección "${videogameCollectionName}" cuyo género contenga "${genre}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${videogameCollectionName}" los videojuegos cuyo género contenga "${genre}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los videojuegos filtrados por etiqueta de edad PEGI y ordenados alfabéticamente por título
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogamesByPegiAge = async (req, res, next) => {
  const pegiAge = validation.normalizeString(req.params.pegiAge)

  try {
    if (!validation.isNumber(pegiAge)) {
      throw new Error(`${validation.INVALID_NUMBER_MSG}: "${pegiAge}"`)
    }

    const videogames = (
      await getVideogamesWithDeveloper(
        await Videogame.find({ pegiAge: { $gte: pegiAge } })
      )
    ).sort(validation.sortVideogames)

    if (videogames.length > 0) {
      return res.status(200).send(videogames)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado videojuegos en la colección "${videogameCollectionName}" que cumplan con la etiqueta de edad "PEGI ${pegiAge}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${videogameCollectionName}" los videojuegos que cumplan con la etiqueta de edad "PEGI ${pegiAge}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los videojuegos filtrados por descriptor de contenido PEGI y ordenados alfabéticamente por título
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogamesByPegiContent = async (req, res, next) => {
  const pegiContent = validation.normalizeString(req.params.pegiContent)

  try {
    const videogames = (
      await getVideogamesWithDeveloper(
        await Videogame.find({
          pegiContent: { $in: validation.getIgnoreAccentCaseText(pegiContent) }
        })
      )
    ).sort(validation.sortVideogames)

    if (videogames.length > 0) {
      return res.status(200).send(videogames)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado videojuegos en la colección "${videogameCollectionName}" cuyo descriptor de contenido PEGI contenga "${pegiContent}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${videogameCollectionName}" los videojuegos cuyo descriptor de contenido PEGI contenga "${pegiContent}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los videojuegos filtrados por plataforma y ordenados alfabéticamente por título
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogamesByPlatform = async (req, res, next) => {
  const platform = validation.normalizeString(req.params.platform)

  try {
    const videogames = (
      await getVideogamesWithDeveloper(
        await Videogame.find({
          platform: { $in: validation.getIgnoreAccentCaseText(platform) }
        })
      )
    ).sort(validation.sortVideogames)

    if (videogames.length > 0) {
      return res.status(200).send(videogames)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado videojuegos en la colección "${videogameCollectionName}" cuya plataforma contenga "${platform}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${videogameCollectionName}" los videojuegos cuya plataforma contenga "${platform}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los videojuegos filtrados por nombre de desarrollador y ordenados alfabéticamente por título
// Se añade a la información el nombre del desarrollador del videojuego
const getVideogamesByDeveloperName = async (req, res, next) => {
  const name = validation.normalizeString(req.params.name)
  const VIDEOGAMES_NOT_FOUND_BY_DEV_NAME_MSG = `No se han encontrado videojuegos en la colección "${videogameCollectionName}" cuyo desarrollador contenga en el nombre "${name}"`

  try {
    const developers = await Developer.find({
      name: validation.getIgnoreAccentCaseText(name)
    }).populate('videogames')

    if (developers.length > 0) {
      const videogames = (
        await getVideogamesWithDeveloper(
          developers.reduce(
            (acc, developer) => acc.concat(developer.videogames),
            []
          )
        )
      ).sort(validation.sortVideogames)

      if (videogames.length > 0) {
        return res.status(200).send(videogames)
      } else {
        return res.status(404).send(VIDEOGAMES_NOT_FOUND_BY_DEV_NAME_MSG)
      }
    } else {
      return res.status(404).send(VIDEOGAMES_NOT_FOUND_BY_DEV_NAME_MSG)
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${videogameCollectionName}" los videojuegos cuyo desarrollador contenga en el nombre "${name}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Crea un videojuego nuevo
const createVideogame = async (req, res, next) => {
  try {
    return res
      .status(201)
      .send(
        await getVideogameWithDeveloper(await new Videogame(req.body).save())
      )
  } catch (error) {
    error.message = `Se ha producido un error al crear el videojuego en la colección "${videogameCollectionName}":${
      validation.LINE_BREAK
    }${validation.formatErrorMsg(error.message)}`
    error.status = 500
    next(error)
  }
}

// Actualiza un videojuego existente mediante su identificador
const updateVideogame = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const videogame = await Videogame.findById(id)
    if (videogame == null) {
      throw new Error(getVideogameNotFoundByIdMsg(id))
    }

    if (Object.keys(req.body).length === 0) {
      throw new Error(
        `No se ha introducido ningún dato para actualizar el videojuego con el identificador "${id}"`
      )
    }

    // Se obtiene la información del videojuego a actualizar y se sustituye por la introducida por el usuario
    let updatedVideogame = new Videogame(videogame)

    const {
      title,
      genre,
      description,
      releaseDate,
      pegiAge,
      pegiContent,
      platform
    } = req.body
    updatedVideogame.title = title ?? updatedVideogame.title
    updatedVideogame.genre = genre ?? updatedVideogame.genre
    updatedVideogame.description = description ?? updatedVideogame.description
    updatedVideogame.releaseDate = releaseDate ?? updatedVideogame.releaseDate
    updatedVideogame.pegiAge = pegiAge ?? updatedVideogame.pegiAge
    updatedVideogame.pegiContent = pegiContent ?? updatedVideogame.pegiContent
    updatedVideogame.platform = platform ?? updatedVideogame.platform

    return res
      .status(201)
      .send(await getVideogameWithDeveloper(await updatedVideogame.save()))
  } catch (error) {
    error.message = `Se ha producido un error al actualizar en la colección "${videogameCollectionName}" el videojuego con el identificador "${id}" :${
      validation.LINE_BREAK
    }${validation.formatErrorMsg(error.message)}`
    error.status = 500
    next(error)
  }
}

// Elimina un videojuego existente mediante su identificador
// Si un desarrollador tiene relacionado el videojuego eliminado, se elimina de la lista de videojuegos de su desarrollador
// Se usa una sesión y una transacción para almacenar varias operaciones
const deleteVideogame = async (req, res, next) => {
  const { id } = req.params
  // Inicio de la sesión
  const session = await mongoose.startSession()

  try {
    // Inicio de la transacción de la sesión
    session.startTransaction()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const videogame = await Videogame.findById(id)
    if (videogame == null) {
      throw new Error(getVideogameNotFoundByIdMsg(id))
    }

    // Primero se elimina el videojuego
    await Videogame.deleteOne(videogame, { session })

    // Después se elimina el videojuego de la lista de videojuegos de su desarrollador
    const developers = await Developer.find({ videogames: { $in: id } })
    const deletedVideogameFromDeveloperMsg =
      developers.length > 0
        ? `${validation.LINE_BREAK}Se ha eliminado el videojuego con el identificador "${id}" de la lista de videojuegos de su desarrollador`
        : ''

    try {
      for (const developer of developers) {
        developer.videogames = developer.videogames
          .map((id) => id.toJSON())
          .filter((videogameId) => videogameId !== id)

        // Se actualiza el desarrollador
        await new Developer(developer).save({ session })
      }
    } catch (error) {
      throw new Error(
        `Se ha producido un error al eliminar el videojuego con el identificador "${id}" de la lista de videojuegos de su desarrollador:${validation.LINE_BREAK}${error.message}`
      )
    }

    // Commit de la transacción
    await session.commitTransaction()

    return res
      .status(200)
      .send(
        `Se ha eliminado en la colección "${videogameCollectionName}" el videojuego con el identificador "${id}"${deletedVideogameFromDeveloperMsg}`
      )
  } catch (error) {
    // Rollback de la transacción
    await session.abortTransaction()

    error.message = `Se ha producido un error al eliminar en la colección "${videogameCollectionName}" el videojuego con el identificador "${id}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  } finally {
    // En cualquier caso, se finaliza la sesión
    session.endSession()
  }
}

const videogameController = {
  getVideogames,
  getVideogameById,
  getVideogamesByTitle,
  getVideogamesByGenre,
  getVideogamesByPegiAge,
  getVideogamesByPegiContent,
  getVideogamesByPlatform,
  getVideogamesByDeveloperName,
  createVideogame,
  updateVideogame,
  deleteVideogame
}

module.exports = { videogameController }
