/* Controladores de usuarios */

const mongoose = require('mongoose')
const {
  BOOK_COLLECTION_NAME: bookCollectionName
} = require('../../utils/validations/validation')
const { User } = require('../models/user')
const userCollectionName = User.collection.name
const { validation } = require('../../utils/validations/validation')

const getUserNotFoundByIdMsg = (id) => {
  return `No se ha encontrado ningún usuario en la colección "${userCollectionName}" con el identificador "${id}"`
}

// Devuelve los usuarios mediante el identificador de uno de sus libros prestados
// Validador
const getUsersByBookIdValidator = async (id) => {
  return await User.find({ books: { $in: id } })
}

// Devuelve todos los usuarios ordenados alfabéticamente por nombre de usuario
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const getUsers = async (req, res, next) => {
  try {
    const users = (
      await validation.getDocumentsWithSortedBooks(
        await User.find().populate('books', 'title')
      )
    ).sort(validation.sortUsers)

    if (users.length > 0) {
      return res.status(200).send(users)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado usuarios en la colección "${userCollectionName}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar los usuarios en la colección "${userCollectionName}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve un usuario mediante su identificador
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const getUserById = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const user = validation.getDocumentWithSortedBooks(
      await User.findById(id).populate('books', 'title')
    )

    if (user != null) {
      return res.status(200).send(user)
    } else {
      return res.status(404).send(getUserNotFoundByIdMsg(id))
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${userCollectionName}" el usuario con el identificador "${id}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los usuarios filtrados por nombre de usuario y ordenados alfabéticamente por nombre de usuario
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const getUsersByUserName = async (req, res, next) => {
  const userName = validation.getIgnoreAccentCaseText(
    validation.normalizeString(req.params.userName)
  )

  try {
    const users = (
      await validation.getDocumentsWithSortedBooks(
        await User.find({ userName }).populate('books', 'title')
      )
    ).sort(validation.sortUsers)

    if (users.length > 0) {
      return res.status(200).send(users)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado usuarios en la colección "${userCollectionName}" cuyo nombre de usuario contenga "${validation.normalizeSearchString(
            userName
          )}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${userCollectionName}" los usuarios cuyo nombre de usuario contenga "${validation.normalizeSearchString(
      userName
    )}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los usuarios filtrados por rol y ordenados alfabéticamente por nombre de usuario
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const getUsersByRol = async (req, res, next) => {
  const rol = validation.getIgnoreAccentCaseText(
    validation.normalizeString(req.params.rol)
  )

  try {
    const users = (
      await validation.getDocumentsWithSortedBooks(
        await User.find({ rol }).populate('books', 'title')
      )
    ).sort(validation.sortUsers)

    if (users.length > 0) {
      return res.status(200).send(users)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado usuarios en la colección "${userCollectionName}" cuyo rol contenga "${validation.normalizeSearchString(
            rol
          )}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${userCollectionName}" los usuarios cuyo rol contenga "${validation.normalizeSearchString(
      rol
    )}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los usuarios mediante el identificador de uno de sus libros prestados
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const getUsersByBookId = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const users = await validation.getDocumentsWithSortedBooks(
      await User.find({ books: { $in: id } }).populate('books', 'title')
    )

    if (users.length > 0) {
      return res.status(200).send(users)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado usuarios en la colección "${userCollectionName}" con el identificador "${id}" en alguno de sus libros prestados`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${userCollectionName}" los usuarios con el identificador "${id}" en alguno de sus libros prestados:${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Devuelve los usuarios filtrados por título de libro prestado y ordenados alfabéticamente por nombre de usuario
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const getUsersByBookTitle = async (req, res, next) => {
  const title = validation.getIgnoreAccentCaseText(
    validation.normalizeString(req.params.title)
  )

  try {
    const users = (
      await validation.getDocumentsWithSortedBooks(
        await User.find().populate('books', 'title')
      )
    )
      .filter((user) =>
        user.books.some((book) =>
          title.test(validation.getIgnoreAccentCaseText(book.title))
        )
      )
      .sort(validation.sortUsers)

    if (users.length > 0) {
      return res.status(200).send(users)
    } else {
      return res
        .status(404)
        .send(
          `No se han encontrado usuarios en la colección "${userCollectionName}" con algún libro prestado cuyo título contenga "${validation.normalizeSearchString(
            title
          )}"`
        )
    }
  } catch (error) {
    error.message = `Se ha producido un error al consultar en la colección "${userCollectionName}" los usuarios con algún libro prestado cuyo título contenga "${validation.normalizeSearchString(
      title
    )}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

// Crea un usuario nuevo
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const createUser = async (req, res, next) => {
  try {
    // Se comprueba aquí y no en el middleware pre validate porque cualquier tratamiento omite el error de "cast" y toma por valor el array vacío
    if (req.body.books != null) {
      req.body.books =
        req.body.books.length > 0
          ? validation.normalizeArray(req.body.books)
          : []
    }

    // Sólo se permite la población de campos en funciones de búsqueda
    return res
      .status(201)
      .send(
        await validation.getDocumentWithSortedBooks(
          await User.findById((await new User(req.body).save())._id).populate(
            'books',
            'title'
          )
        )
      )
  } catch (error) {
    error.message = `Se ha producido un error al crear el usuario en la colección "${userCollectionName}":${
      validation.LINE_BREAK
    }${validation.formatErrorMsg(error.message)}`
    error.status = 500
    next(error)
  }
}

// Actualiza un usuario existente mediante su identificador
// Se pueblan los libros prestados con su título y ordenados alfabéticamente por título
const updateUser = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const user = await User.findById(id)
    if (user == null) {
      throw new Error(getUserNotFoundByIdMsg(id))
    }

    if (Object.keys(req.body).length === 0) {
      throw new Error(
        `No se ha introducido ningún dato para actualizar el usuario con el identificador "${id}"`
      )
    }

    // Se obtiene la información del usuario a actualizar y se sustituye por la introducida por el usuario
    let updatedUser = new User(user)

    const { userName, email, rol, books } = req.body
    updatedUser.userName = userName ?? updatedUser.userName
    updatedUser.email = email ?? updatedUser.email
    updatedUser.rol = rol ?? updatedUser.rol

    // Se comprueba aquí y no en el middleware pre validate porque cualquier tratamiento omite el error de "cast" y toma por valor el array de libros prestados almacenado anteriormente en el usuario
    if (books != null) {
      updatedUser.books =
        books.length > 0 ? validation.normalizeArray(books) : []
    }

    // Sólo se permite la población de campos en funciones de búsqueda
    return res
      .status(201)
      .send(
        await validation.getDocumentWithSortedBooks(
          await User.findById((await updatedUser.save())._id).populate(
            'books',
            'title'
          )
        )
      )
  } catch (error) {
    error.message = `Se ha producido un error al actualizar en la colección "${userCollectionName}" el usuario con el identificador "${id}":${
      validation.LINE_BREAK
    }${validation.formatErrorMsg(error.message)}`
    error.status = 500
    next(error)
  }
}

// Elimina un usuario existente mediante su identificador
const deleteUser = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const user = await User.findById(id)
    if (user == null) {
      throw new Error(getUserNotFoundByIdMsg(id))
    }

    if (user.books.length > 0) {
      throw new Error(
        `El usuario no se puede eliminar porque tiene libros actualmente prestados en la colección "${bookCollectionName}"`
      )
    }

    await User.deleteOne(user)

    return res
      .status(200)
      .send(
        `Se ha eliminado en la colección "${userCollectionName}" el usuario con el identificador "${id}"`
      )
  } catch (error) {
    error.message = `Se ha producido un error al eliminar en la colección "${userCollectionName}" el usuario con el identificador "${id}":${validation.LINE_BREAK}${error.message}`
    error.status = 500
    next(error)
  }
}

const userController = {
  getUsers,
  getUserById,
  getUsersByUserName,
  getUsersByRol,
  getUsersByBookId,
  getUsersByBookTitle,
  createUser,
  updateUser,
  deleteUser
}

module.exports = { getUsersByBookIdValidator, userController }
