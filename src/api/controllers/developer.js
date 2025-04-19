/* Controladores de desarrolladores */

const mongoose = require('mongoose')
const { Developer } = require('../models/developer')
const developerCollectionName = Developer.collection.name
const { validation } = require('../../utils/validations/validation')
const moment = require('moment')

const getDeveloperNotFoundByIdMsg = (id) => {
  return `No se ha encontrado ningún desarrollador en la colección "${developerCollectionName}" con el identificador "${id}"`
}

// Devuelve un desarrollador con su lista de videojuegos ordenados alfabéticamente por título y las fechas formateadas
const getDeveloperWithSortedVideogames = (developer) => {
  if (developer != null) {
    developer.videogames.sort(validation.sortVideogames)

    developer = developer.toObject()
    developer.createdAt = moment(developer.createdAt).format(
      'DD/MM/YYYY HH:mm:ss'
    )
    developer.updatedAt = moment(developer.updatedAt).format(
      'DD/MM/YYYY HH:mm:ss'
    )
  }

  return developer
}

// Devuelve los desarrolladores con su lista de videojuegos ordenados alfabéticamente por título y las fechas formateadas
const getDevelopersWithSortedVideogames = (developers) => {
  return developers.map((developer) =>
    getDeveloperWithSortedVideogames(developer)
  )
}

// Devuelve un desarrollador mediante el identificador de uno de sus videojuegos
// Validador
const getDeveloperByVideogameIdValidator = async (id) => {
  return await Developer.findOne({ videogames: { $in: id } })
}

// Devuelve todos los desarrolladores ordenados alfabéticamente por nombre
// Se pueblan los videojuegos con su título y ordenados alfabéticamente por título
const getDevelopers = async (req, res, next) => {
  try {
    const developers = (
      await getDevelopersWithSortedVideogames(
        await Developer.find().populate('videogames', 'title')
      )
    ).sort(validation.sortDevelopers)

    if (developers.length > 0) {
      return res.status(200).send(developers)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado desarrolladores en la colección "${developerCollectionName}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar los desarrolladores en la colección "${developerCollectionName}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve un desarrollador mediante su identificador
// Se pueblan los videojuegos con su título y ordenados alfabéticamente por título
const getDeveloperById = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const developer = getDeveloperWithSortedVideogames(
      await Developer.findById(id).populate('videogames', 'title')
    )

    if (developer != null) {
      return res.status(200).send(developer)
    } else {
      return res.status(404).send(getDeveloperNotFoundByIdMsg(id))
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${developerCollectionName}" el desarrollador con el identificador "${id}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los desarrolladores filtrados por nombre y ordenados alfabéticamente por nombre
// Se pueblan los videojuegos con su título y ordenados alfabéticamente por título
const getDevelopersByName = async (req, res, next) => {
  const name = validation.normalizeString(req.params.name)

  try {
    const developers = (
      await getDevelopersWithSortedVideogames(
        await Developer.find({
          name: validation.getIgnoreAccentCaseText(name)
        }).populate('videogames', 'title')
      )
    ).sort(validation.sortDevelopers)

    if (developers.length > 0) {
      return res.status(200).send(developers)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado desarrolladores en la colección "${developerCollectionName}" cuyo nombre contenga "${name}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${developerCollectionName}" los desarrolladores cuyo nombre contenga "${name}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve un desarrollador mediante el identificador de uno de sus videojuegos
// Se pueblan los videojuegos con su título y ordenados alfabéticamente por título
const getDeveloperByVideogameId = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const developer = await getDeveloperWithSortedVideogames(
      await Developer.findOne({ videogames: { $in: id } }).populate(
        'videogames',
        'title'
      )
    )

    if (developer != null) {
      return res.status(200).send(developer)
    } else {
      return res
        .status(404)
        .send(
          `No se ha encontrado ningún desarrollador en la colección "${developerCollectionName}" con el identificador "${id}" en alguno de sus videojuegos`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${developerCollectionName}" el desarrollador con el identificador "${id}" en alguno de sus videojuegos:${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los desarrolladores filtrados por título de videojuego y ordenados alfabéticamente por nombre
// Se pueblan los videojuegos con su título y ordenados alfabéticamente por título
const getDevelopersByVideogameTitle = async (req, res, next) => {
  const title = req.params.title

  try {
    const developers = (
      await getDevelopersWithSortedVideogames(
        await Developer.find().populate('videogames', 'title')
      )
    )
      .filter((developer) =>
        developer.videogames.some((videogame) =>
          validation
            .getIgnoreAccentCaseText(title)
            .test(validation.getIgnoreAccentCaseText(videogame.title))
        )
      )
      .sort(validation.sortDevelopers)

    if (developers.length > 0) {
      return res.status(200).send(developers)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado desarrolladores en la colección "${developerCollectionName}" con algún videojuego cuyo título contenga "${title}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${developerCollectionName}" los desarrolladores con algún videojuego cuyo título contenga "${title}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Crea un desarrollador nuevo
// Se pueblan los videojuegos con su título y ordenados alfabéticamente por título
const createDeveloper = async (req, res, next) => {
  try {
    // Se comprueba aquí y no en el middleware pre validate porque cualquier tratamiento omite el error de "cast" y toma por valor el array vacío
    if (req.body.videogames != null) {
      req.body.videogames =
        req.body.videogames.length > 0
          ? validation.normalizeArray(req.body.videogames)
          : []
    }

    // Sólo se permite la población de campos en funciones de búsqueda
    return res
      .status(201)
      .send(
        await getDeveloperWithSortedVideogames(
          await Developer.findById(
            (
              await new Developer(req.body).save()
            )._id
          ).populate('videogames', 'title')
        )
      )
  } catch (error) {
    error.message = `Se ha producido un error al crear el desarrollador en la colección "${developerCollectionName}":${
      validation.LINE_BREAK
    }${validation.formatErrorMsg(error.message)}`
    error.status = 500
    next(error)
  }
}

// Actualiza un desarrollador existente mediante su identificador
// Se pueblan los videojuegos con su título y ordenados alfabéticamente por título
const updateDeveloper = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const developer = await Developer.findById(id)
    if (developer == null) {
      throw new Error(getDeveloperNotFoundByIdMsg(id))
    }

    if (Object.keys(req.body).length === 0) {
      throw new Error(
        `No se ha introducido ningún dato para actualizar el desarrollador con el identificador "${id}"`
      )
    }

    // Se obtiene la información del desarrollador a actualizar y se sustituye por la introducida por el usuario
    let updatedDeveloper = new Developer(developer)

    const { name, foundationYear, founder, headquarters, website, videogames } =
      req.body
    updatedDeveloper.name = name ?? updatedDeveloper.name
    updatedDeveloper.foundationYear =
      foundationYear ?? updatedDeveloper.foundationYear
    updatedDeveloper.founder = founder ?? updatedDeveloper.founder
    updatedDeveloper.headquarters =
      headquarters ?? updatedDeveloper.headquarters
    updatedDeveloper.website = website ?? updatedDeveloper.website

    // Se comprueba aquí y no en el middleware pre validate porque cualquier tratamiento omite el error de "cast" y toma por valor el array de videojuegos almacenado anteriormente en el desarrollador
    if (videogames != null) {
      updatedDeveloper.videogames =
        videogames.length > 0 ? validation.normalizeArray(videogames) : []
    }

    // Sólo se permite la población de campos en funciones de búsqueda
    return res
      .status(201)
      .send(
        await getDeveloperWithSortedVideogames(
          await Developer.findById(
            (
              await updatedDeveloper.save()
            )._id
          ).populate('videogames', 'title')
        )
      )
  } catch (error) {
    error.message = `Se ha producido un error al actualizar en la colección "${developerCollectionName}" el desarrollador con el identificador "${id}" :${
      validation.LINE_BREAK
    }${validation.formatErrorMsg(error.message)}`
    error.status = 500
    next(error)
  }
}

// Elimina un desarrollador existente mediante su identificador
const deleteDeveloper = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const developer = await Developer.findById(id)
    if (developer == null) {
      throw new Error(getDeveloperNotFoundByIdMsg(id))
    }

    await Developer.deleteOne(developer)

    return res
      .status(200)
      .send(
        `Se ha eliminado en la colección "${developerCollectionName}" el desarrollador con el identificador "${id}"`
      )
  } catch (error) {
    error.message = `Se ha producido un error al eliminar en la colección "${developerCollectionName}" el desarrollador con el identificador "${id}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

const developerController = {
  getDevelopers,
  getDeveloperById,
  getDevelopersByName,
  getDeveloperByVideogameId,
  getDevelopersByVideogameTitle,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper
}

module.exports = { getDeveloperByVideogameIdValidator, developerController }
