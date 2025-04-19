const express = require('express')
const videogames = express()
const { connectToDataBase } = require('./src/config/db')
const { videogameRouter } = require('./src/api/routes/videogame')
const { developerRouter } = require('./src/api/routes/developer')
const { validation } = require('./src/utils/validations/validation')
const PORT = 3000

// Permite interpretar las solicitudes HTTP en formato JSON
videogames.use(express.json())
// Permite interpretar las solicitudes HTTP a través del "req.body" de las rutas
videogames.use(express.urlencoded({ extended: false }))

// Se definen las rutas de las colecciones
videogames.use('/videogame', videogameRouter)
videogames.use('/developer', developerRouter)

// Gestión de ruta no encontrada
videogames.use('*', (req, res, next) => {
  const error = new Error(
    `Ruta no encontrada${validation.LINE_BREAK}Comprueba la URL y sus parámetros`
  )
  error.status = 404
  next(error)
})

// Gestión de errores
videogames.use((error, req, res, next) => {
  console.log(
    `Error ${error.status}: ${error.message.replaceAll(
      validation.LINE_BREAK,
      validation.CONSOLE_LINE_BREAK
    )}`
  )

  return res.status(error.status).send(error.message)
})

videogames.listen(PORT, () => {
  console.log(`Servidor express ejecutándose en "http://localhost:${PORT}"`)
  connectToDataBase()
})
