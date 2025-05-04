/* Rutas de usuarios */

// Enrutador para los "endpoints" de los usuarios
const userRouter = require('express').Router()
const { userController } = require('../controllers/user')

userRouter.get('/', userController.getUsers)
userRouter.get('/id/:id', userController.getUserById)
userRouter.get('/userName/:userName', userController.getUsersByUserName)
userRouter.get('/rol/:rol', userController.getUsersByRol)
userRouter.get('/book-id/:id', userController.getUsersByBookId)
userRouter.get('/book-title/:title', userController.getUsersByBookTitle)
userRouter.post('/', userController.createUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

module.exports = { userRouter }
