const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
require('dotenv').config();

const db = require('./models');
const siteRoutes = require('./routes/siteRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', siteRoutes);
app.use('/', userRoutes);

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL exitosa');
    return db.sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error.message);
  });