const express = require('express');
//Crear app de express
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//Helpers
const helpers = require('./helpers');

const routes = require('./routes');
const path = require('path');


//Crear conexión a la bbdd
const db = require('./config/db');

//Importar modelo
require('./models/ProyectoModels');

db.sync()
    .then(()=>console.log('Conectado al servidor'))
    .catch(error =>console.log(error))



//Donde cargar archivos estáticos
app.use(express.static('public'));


//Habilitar pug
app.set('view engine','pug');

//Añadir carpertas views
app.set('views',path.join(__dirname,'./views'));

//Pasar vardump a la app
app.use((req,res,next)=>{
    res.locals.vardump = helpers.vardump;
    next();
})
app.use('/', routes());

app.listen(3000);