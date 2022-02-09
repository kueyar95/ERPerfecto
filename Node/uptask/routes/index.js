const { Router } = require('express');
const express = require('express');
const router = express.Router();

//Importar express-validator
const { body, validationResult } = require('express-validator');

//Importar controlador
const proyectosController = require('../controllers/proyectosController');


module.exports = function(){
    //Ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevoProyecto',proyectosController.formularioProyecto);
    router.post('/nuevoProyecto',
        [body('nombre').notEmpty().trim().escape()],
        proyectosController.nuevoProyecto);

    //Listar proyectos
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    //Actualizar proyectos
    router.get('/proyectos/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevoProyecto/:id',
    [body('nombre').notEmpty().trim().escape()],
    proyectosController.actualizarProyecto);

    return router;
}

