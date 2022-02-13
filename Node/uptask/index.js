const express = require('express');
//Crear app de express
const app = express();

//Donde cargar archivos estáticos
app.use(express.static('public'));


//Habilitar pug
app.set('view engine','pug');

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//Helpers
const helpers = require('./helpers');

const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//Crear conexión a la bbdd
const db = require('./config/db');

//Importar modelos
    //Proyectos
require('./models/ProyectosModel');
    //Tareas
require('./models/TareasModel');

db.sync()
    .then(()=>console.log('Conectado al servidor'))
    .catch(error =>console.log(error))



//Añadir carpertas views
app.set('views',path.join(__dirname,'./views'));

//Agregar flash messages
app.use(flash());

app.use(cookieParser());

//Sesiones
app.use(session({
    secret: 'cookieSession',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Pasar vardump a la app
app.use((req,res,next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    console.log(res.locals.usuario);
    next();
})
app.use('/', routes());

app.listen(3000);

require('./handlers/email');