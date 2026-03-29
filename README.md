# Proyecto Módulo 7 (actualización) - Node, Express, PostgreSQL y Sequelize

Este proyecto fue desarrollado como parte del bootcamp y corresponde a la evolución del trabajo realizado en el módulo anterior.

La aplicación está construida con **Node.js** y **Express**, incorporando persistencia de datos con **PostgreSQL** mediante **Sequelize ORM**, renderizado de vistas con **Handlebars** y una estructura organizada en el patrón **MVC**.

## Objetivo del proyecto

El objetivo de este proyecto es desarrollar una aplicación web capaz de:

- levantar un servidor con Node.js y Express;
- conectarse a una base de datos PostgreSQL;
- gestionar usuarios mediante operaciones CRUD;
- renderizar vistas dinámicas con Handlebars;
- mantener una estructura ordenada por configuración, rutas, controladores, modelos y vistas.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- pg
- pg-hstore
- hbs / Handlebars
- method-override
- dotenv
- nodemon

## Requisitos previos

Para ejecutar este proyecto necesitas tener instalado:

- Node.js v18 o superior
- npm
- PostgreSQL
- Un cliente para gestionar base de datos (por ejemplo, pgAdmin o psql)
- Un navegador web

## Instalación

1. Clona este repositorio o descarga el proyecto.
2. Abre una terminal dentro de la carpeta del proyecto.
3. Instala las dependencias con el siguiente comando:

```bash
npm install
```

## Configuración de variables de entorno

Antes de ejecutar el proyecto, debes crear un archivo `.env` en la raíz del proyecto con la configuración de conexión a tu base de datos.

Ejemplo:

```env
DB_NAME=nombre_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

> Ajusta estos valores según tu entorno local.

## Configuración de la base de datos

Dentro del proyecto se incluye un script SQL en la carpeta:

```bash
scripts_ddbb/ddbb_modulo7.sql
```

Ese archivo puede utilizarse para crear la base de datos, tablas o datos iniciales necesarios para el funcionamiento del proyecto.

Se recomienda:

1. Crear la base de datos en PostgreSQL.
2. Ejecutar el script `ddbb_modulo7.sql`.
3. Verificar que las credenciales del archivo `.env` coincidan con tu configuración local.

## Ejecución del proyecto

Para iniciar el proyecto en modo normal:

```bash
npm start
```

Para iniciarlo en modo desarrollo con nodemon:

```bash
npm run dev
```

Luego puedes abrir el navegador en:

```bash
http://localhost:3000
```

## Funcionalidades principales

La aplicación actualmente permite:

- visualizar la página principal;
- visualizar una página informativa del proyecto;
- listar usuarios registrados;
- crear nuevos usuarios;
- editar usuarios existentes;
- eliminar usuarios;
- trabajar con vistas dinámicas conectadas a base de datos.

## Estructura del proyecto

```bash
├── config
│   └── database.js
├── controllers
│   ├── siteController.js
│   └── userController.js
├── logs
│   └── log.txt
├── middlewares
│   └── requestlogger.js
├── models
│   ├── User.js
│   └── index.js
├── public
│   └── css
│       └── styles.css
├── routes
│   ├── siteRoutes.js
│   └── userRoutes.js
├── scripts_ddbb
│   └── ddbb_modulo7.sql
├── utils
│   └── fileManager.js
├── views
│   ├── layouts
│   │   └── main.hbs
│   ├── users
│   │   ├── create.hbs
│   │   ├── edit.hbs
│   │   └── index.hbs
│   ├── about.hbs
│   └── home.hbs
├── README.md
├── app.js
├── package-lock.json
└── package.json
```

## Organización del proyecto

La aplicación fue organizada siguiendo una estructura modular:

- `config/`: configuración de la conexión a la base de datos.
- `controllers/`: lógica de negocio y manejo de las solicitudes.
- `models/`: definición de modelos Sequelize.
- `routes/`: definición de rutas del sistema.
- `views/`: plantillas Handlebars para renderizar las vistas.
- `public/`: archivos estáticos como hojas de estilo.
- `scripts_ddbb/`: scripts SQL de apoyo para la base de datos.

## Rutas generales

Las rutas del sistema están organizadas en archivos separados dentro de `routes/`.

De forma general, el proyecto contempla:

- rutas públicas del sitio;
- rutas para gestión de usuarios;
- vistas para listar, crear y editar usuarios;
- endpoints asociados al flujo CRUD.

> Las rutas exactas pueden revisarse directamente en `siteRoutes.js` y `userRoutes.js`.

## Decisiones tomadas

- Se mantuvo `app.js` como punto de entrada principal del proyecto.
- Se utilizó una estructura MVC para mejorar la organización del código.
- Se incorporó Sequelize para facilitar la conexión y manipulación de datos en PostgreSQL.
- Se usó Handlebars para generar vistas dinámicas en el servidor.
- Se separaron las responsabilidades del proyecto en carpetas específicas para mantener una arquitectura más clara y escalable.

## Estado actual

Actualmente, el proyecto cuenta con:

- servidor funcional con Express;
- conexión a base de datos PostgreSQL;
- modelo de usuarios con Sequelize;
- vistas dinámicas con Handlebars;
- operaciones CRUD para la gestión de usuarios;
- estructura organizada para continuar ampliando funcionalidades.

## Autor

Proyecto desarrollado por Andres Maturana como parte del proceso de aprendizaje en el bootcamp de Desarrollo de Aplicaciones Full Stack JavaScript.