const { Router } = require('express');
const express = require('express');
const router = express.Router();

//Importar express-validator
const { body, validationResult } = require('express-validator');

//Importar controladores
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function(){
    //Home
    router.get('/',
        authController.usuarioAutenticado,
        proyectosController.proyectosHome);
    
    //Proyectos
        //Insertar proyectos
    router.get('/nuevoProyecto',
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto);
    router.post('/nuevoProyecto',
        authController.usuarioAutenticado,
        [body('nombre').notEmpty().trim().escape()],
        proyectosController.nuevoProyecto);

        //Listar proyectos
    router.get('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl);

        //Actualizar proyectos
    router.get('/proyectos/editar/:id',
        authController.usuarioAutenticado,
        proyectosController.formularioEditar);
    router.post('/nuevoProyecto/:id',
        authController.usuarioAutenticado,
        [body('nombre').notEmpty().trim().escape()],
        proyectosController.actualizarProyecto);

        //Eliminar proyectos
    router.delete('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto);

    //Tareas
        //Insertar tareas
    router.post('/proyectos/:url',
        authController.usuarioAutenticado,
        tareasController.nuevaTarea);

        //Actualizar tareas
    router.patch('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.actEstadoTarea);

        //Eliminar tareas
    router.delete('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.eliminarTarea);
    

    //Usuarios, Login y Register
        //Crear cuenta
    router.get('/crearCuenta', usuariosController.formCrearCuenta);
    router.post('/crearCuenta', usuariosController.crearCuenta);
    router.get('/confirmarUsuario/:correo', usuariosController.confirmarCuenta);

        //Iniciar Sesión
    router.get('/iniciarSesion', usuariosController.formIniciarSesion);
    router.post('/iniciarSesion', authController.autenticarUsuario);

    router.get('/cerrarSesion', authController.cerrarSesion);

    router.get('/restablecerPassword', usuariosController.formRestablecerPassword);
    router.post('/restablecerPassword', authController.enviarToken);
    router.get('/restablecerPassword/:token', authController.formresetPassword);
    router.post('/restablecerPassword/:token', authController.resetPassword);








    return router;
}

