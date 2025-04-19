# Videogames

**_Videogames_** es una Base de Datos sencilla que implementa un **CRUD** completo sobre dos colecciones de datos relacionadas, la de videojuegos (**_videogame_**) y la de desarrolladores (**_developer_**).

Se recomienda el uso de alguna aplicación que permita probar la **API** de la aplicación mediante el envío de peticiones **HTTP** y la recepción de sus correspondientes respuestas, como puede ser [Insomnia].

## Colección _videogame_

A continuación se detallan los datos que almacena un videojuego de la colección **_videogame_**:

| CAMPO             | DESCRIPCIÓN                                 | TIPO        | OBLIGATORIO | ÚNICO | VALOR                                                                                                                                                                                    |
| ----------------- | ------------------------------------------- | ----------- | ----------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\__id_**        | Identificador del videojuego                | Hexadecimal | Sí          | Sí    | **Automático**                                                                                                                                                                           |
| **_title_**       | Título del videojuego                       | Texto       | Sí          | Sí    | Texto libre                                                                                                                                                                              |
| **_genre_**       | Género del videojuego                       | Lista       | Sí          | No    | _Acción, Arcade, Aventura, Aventura gráfica, Carreras, Deporte, Disparos, Estrategia, Lucha, Mundo abierto, Musical, Plataformas, Puzle, Rol, Sigilo, Simulación, Supervivencia, Terror_ |
| **_description_** | Descripción del videojuego                  | Texto       | No          | No    | Texto libre                                                                                                                                                                              |
| **_releaseDate_** | Fecha de lanzamento del videojuego          | Texto       | Sí          | No    | Fecha válida en formato _DD/MM/AAAA_                                                                                                                                                     |
| **_pegiAge_**     | Etiqueta de edad PEGI del videojuego        | Número      | Sí          | No    | _3, 7, 12, 16, 18_                                                                                                                                                                       |
| **_pegiContent_** | Descriptor de contenido PEGI del videojuego | Lista       | Sí          | No    | _Discriminación, Drogas, Incluye compras, Juego, Lenguaje soez, Miedo, Sexo, Violencia_                                                                                                  |
| **_platform_**    | Plataforma del videojuego                   | Lista       | Sí          | No    | _Android / iOS, Nintendo, PC, PlayStation, Xbox_                                                                                                                                         |
| **_developer_**   | Desarrollador del videojuego                | Texto       | No          | No    | **Automático**                                                                                                                                                                           |
| **_\_\_v_**       | Versión del videojuego                      | Número      | No          | No    | **Automático** (se incrementa con cada modificación del videojuego)                                                                                                                      |
| **_createdAt_**   | Fecha de creación del videojuego            | Fecha       | No          | No    | **Automático** (fecha en formato _DD/MM/AAAA HH:MM:SS_)                                                                                                                                  |
| **_updatedAt_**   | Fecha de modificación del videojuego        | Fecha       | No          | No    | **Automático** (fecha en formato _DD/MM/AAAA HH:MM:SS_)                                                                                                                                  |

## Colección _developer_

A continuación se detallan los datos que almacena un desarrollador de la colección **_developer_**:

| CAMPO                | DESCRIPCIÓN                             | TIPO        | OBLIGATORIO | ÚNICO | VALOR                                                                                  |
| -------------------- | --------------------------------------- | ----------- | ----------- | ----- | -------------------------------------------------------------------------------------- |
| **\__id_**           | Identificador del desarrollador         | Hexadecimal | Sí          | Sí    | **Automático**                                                                         |
| **_name_**           | Nombre del desarrollador                | Texto       | Sí          | Sí    | Texto libre                                                                            |
| **_foundationYear_** | Año de fundación del desarrollador      | Texto       | Sí          | No    | Año válido (a partir de 1970) en formato _AAAA_                                        |
| **_founder_**        | Fundador del desarrollador              | Texto       | No          | No    | Texto libre                                                                            |
| **_headquarters_**   | Sede central del desarrollador          | Texto       | No          | No    | Texto libre                                                                            |
| **_website_**        | Sitio web del desarrollador             | Texto       | Sí          | Sí    | Sitio web válido                                                                       |
| **_videogames_**     | Videojuegos del desarrollador           | Lista       | No          | Sí    | Identificadores válidos de videojuegos (colección **_videogame_**) separados por comas |
| **_\_\_v_**          | Versión del desarrollador               | Número      | No          | No    | **Automático** (se incrementa con cada modificación del desarrollador)                 |
| **_createdAt_**      | Fecha de creación del desarrollador     | Fecha       | No          | No    | **Automático** (fecha en formato _DD/MM/AAAA HH:MM:SS_)                                |
| **_updatedAt_**      | Fecha de modificación del desarrollador | Fecha       | No          | No    | **Automático** (fecha en formato _DD/MM/AAAA HH:MM:SS_)                                |

## Instalación y ejecución de la aplicación

Una vez descargada la aplicación del repositorio de [GitHub] se debe ir al directorio raíz (**_Proyecto_6_**) y ejecutar el siguiente comando de **Node.js**:

```sh
npm run dev
```

Si se desea, se puede ejecutar **previamente** una carga inicial de datos en ambas colecciones mediante el siguiente comando de **Node.js**:

```sh
npm run createData
```

**`IMPORTANTE:`** `la carga inicial elimina todos los datos almacenados previamente en ambas colecciones`

## Endpoints de la colección _videogame_

A continuación se detallan las peticiones **HTTP** de la **API** de la colección **_videogame_** y sus posibles respuestas:

| MÉTODO | URL                                             | DESCRIPCIÓN                       | PARÁMETROS                                  | CUERPO DE LA PETICIÓN                              | CÓDIGO DE RESPUESTA | RESPUESTA                                                                              |
| ------ | ----------------------------------------------- | --------------------------------- | ------------------------------------------- | -------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| GET    | http://localhost:3000/videogame                 | Búsqueda de todos los videojuegos |                                             |                                                    | 200                 | Lista de videojuegos ordenados por título                                              |
| GET    | http://localhost:3000/videogame/id/             | Búsqueda de un videojuego         | Identificador del videojuego                |                                                    | 200                 | Videojuego                                                                             |
| GET    | http://localhost:3000/videogame/title/          | Búsqueda filtrada                 | Título del videojuego                       |                                                    | 200                 | Lista de videojuegos filtrados por título y ordenados por título                       |
| GET    | http://localhost:3000/videogame/genre/          | Búsqueda filtrada                 | Género del videojuego                       |                                                    | 200                 | Lista de videojuegos filtrados por género y ordenados por título                       |
| GET    | http://localhost:3000/videogame/pegi-age/       | Búsqueda filtrada                 | Etiqueta de edad PEGI del videojuego        |                                                    | 200                 | Lista de videojuegos filtrados por etiqueta de edad PEGI y ordenados por título        |
| GET    | http://localhost:3000/videogame/pegi-content/   | Búsqueda filtrada                 | Descriptor de contenido PEGI del videojuego |                                                    | 200                 | Lista de videojuegos filtrados por descriptor de contenido PEGI y ordenados por título |
| GET    | http://localhost:3000/videogame/pegi-platform/  | Búsqueda filtrada                 | Plataforma del videojuego                   |                                                    | 200                 | Lista de videojuegos filtrados por plataforma y ordenados por título                   |
| GET    | http://localhost:3000/videogame/developer-name/ | Búsqueda filtrada                 | Nombre del desarrollador del videojuego     |                                                    | 200                 | Lista de videojuegos filtrados por nombre del desarrollador y ordenados por título     |
| POST   | http://localhost:3000/videogame                 | Creación de un videojuego         |                                             | **JSON** con los campos del videojuego a crear     | 201                 | Videojuego creado                                                                      |
| PUT    | http://localhost:3000/videogame/                | Modificación de un videojuego     | Identificador del videojuego                | **JSON** con los campos a modificar del videojuego | 201                 | Videojuego modificado                                                                  |
| DEL    | http://localhost:3000/videogame/                | Eliminación de un videojuego      | Identificador del videojuego                |                                                    | 200                 | Mensaje de confirmación de eliminación del videojuego                                  |

- El código de respuesta también puede ser **404** cuando no se encuentran resultados de búsqueda (métodos **GET**)
- El código de respuesta también puede ser **500** cuando se produce un error interno del servidor al procesar la petición (por ejemplo, durante la validación de los campos del **JSON** en los métodos **POST** y **PUT**)

> La información devuelta de un videojuego también incluye el **nombre** de su desarrollador

> Los métodos **POST** y **PUT** requieren en la petición un cuerpo en formato **JSON** con la información necesaria de los campos:

```sh
{"campo1":"valor1",...,"campoN":"valorN"}
```

**`IMPORTANTE:`** `un error de` **_`cast`_** `(conversión) se produce cuando el campo` **_`pegiAge`_** `no es numérico`

**`IMPORTANTE:`** `cuando se elimina un videojuego, también se elimina de la lista de videojuegos de su desarrollador`

## Endpoints de la colección _developer_

A continuación se detallan las peticiones **HTTP** de la **API** de la colección **_developer_** y sus posibles respuestas:

| MÉTODO | URL                                              | DESCRIPCIÓN                           | PARÁMETROS                                     | CUERPO DE LA PETICIÓN                                 | CÓDIGO DE RESPUESTA | RESPUESTA                                                                           |
| ------ | ------------------------------------------------ | ------------------------------------- | ---------------------------------------------- | ----------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------- |
| GET    | http://localhost:3000/developer                  | Búsqueda de todos los desarrolladores |                                                |                                                       | 200                 | Lista de desarrolladores ordenados por nombre                                       |
| GET    | http://localhost:3000/developer/id/              | Búsqueda de un desarrollador          | Identificador del desarrollador                |                                                       | 200                 | Desarrollador                                                                       |
| GET    | http://localhost:3000/developer/name/            | Búsqueda filtrada                     | Nombre del desarrollador                       |                                                       | 200                 | Lista de desarrolladores filtrados por nombre y ordenados por nombre                |
| GET    | http://localhost:3000/developer/videogame-id/    | Búsqueda de un desarrollador          | Identificador del videojuego del desarrollador |                                                       | 200                 | Desarrollador                                                                       |
| GET    | http://localhost:3000/developer/videogame-title/ | Búsqueda filtrada                     | Título del videojuego del desarrollador        |                                                       | 200                 | Lista de desarrolladores filtrados por título del videojuego y ordenados por nombre |
| POST   | http://localhost:3000/developer                  | Creación de un desarrollador          |                                                | **JSON** con los campos del desarrollador a crear     | 201                 | Desarrollador creado                                                                |
| PUT    | http://localhost:3000/developer/                 | Modificación de un desarrollador      | Identificador del desarrollador                | **JSON** con los campos a modificar del desarrollador | 201                 | Desarrollador modificado                                                            |
| DEL    | http://localhost:3000/developer/                 | Eliminación de un desarrollador       | Identificador del desarrollador                |                                                       | 200                 | Mensaje de confirmación de eliminación del desarrollador                            |

- El código de respuesta también puede ser **404** cuando no se encuentran resultados de búsqueda (métodos **GET**)
- El código de respuesta también puede ser **500** cuando se produce un error interno del servidor al procesar la petición (por ejemplo, durante la validación de los campos del **JSON** en los métodos **POST** y **PUT**)

> La información devuelta de un desarrollador se puebla con el **identificador** y el **título** de sus videojuegos ordenados por título

> Los métodos **POST** y **PUT** requieren en la petición un cuerpo en formato **JSON** con la información necesaria de los campos:

```sh
{"campo1":"valor1",...,"campoN":"valorN"}
```

**`IMPORTANTE:`** `un error de` **_`cast`_** `(conversión) se produce cuando el campo` **_`videogames`_** `no contiene identificadores válidos de videojuegos`

**`IMPORTANTE:`** `cuando se relaciona un desarrollador con un videojuego, éste debe existir en la colección` **_`videogame`_** `y no pertenecer a otro desarrollador`

[//]: # 'Lista de enlaces:'
[Insomnia]: https://insomnia.rest/
[GitHub]: https://github.com/carherval/Proyecto_6
