# Proyecto Módulo 6 - Node y Express

Este proyecto fue desarrollado como parte del módulo 6 del bootcamp.

La idea fue construir una aplicación base con Node.js y Express, capaz de servir contenido web, manejar rutas públicas y registrar visitas en un archivo plano.

## Requisitos

Para ejecutar este proyecto necesitas tener instalado:

- Node.js v18 o superior
- npm
- Un navegador web

## Instalación

Primero hay que abrir la terminal dentro de la carpeta del proyecto y ejecutar:

```bash
npm install
```

Eso instalará todas las dependencias necesarias.

## Ejecución

Para iniciar el proyecto en modo normal:

```bash
npm start
```

Para iniciarlo en modo desarrollo con nodemon:

```bash
npm run dev
```

Luego puedes abrir el navegador en esta dirección:

```bash
http://localhost:3000
```

## Rutas del proyecto

Estas son las rutas principales que tiene la aplicación:

- `/` → muestra la página principal en HTML.
- `/about` → muestra información general del proyecto.
- `/status` → devuelve el estado del servidor en formato JSON.
- `/visitas` → registra y muestra las visitas guardadas en el archivo `log.txt`.

## Estructura general

El proyecto está organizado en varias carpetas para que el código quede más claro y ordenado:

```bash
proyecto-modulo6/
├── app.js
├── package.json
├── public/
├── routes/
├── controllers/
├── middlewares/
├── utils/
├── logs/
└── .env
```

## Decisiones tomadas

Se eligió `app.js` como archivo principal porque permite identificar fácilmente el punto de inicio del servidor.

Se usó la carpeta `public` para servir los archivos estáticos como HTML y CSS usando `express.static`.

También se separó el proyecto en rutas, controladores, middlewares, utilidades y logs para mantener una estructura más modular y fácil de entender.

Para registrar accesos se utilizó el módulo `fs`, guardando la fecha, hora y ruta visitada en un archivo `log.txt`.

## Tecnologías usadas

- Node.js
- Express
- dotenv
- nodemon
- HTML
- CSS

## Estado actual

Hasta ahora el proyecto cumple con la primera parte del módulo: levantar el servidor, servir contenido web, crear rutas públicas y guardar registros en archivos planos.
"# proyecto-modulo6" 
