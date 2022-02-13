const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./ProyectosModel');

const Tareas = db.define('tareas',{
    id: {
        type:           Sequelize.INTEGER,
        primaryKey:     true,
        autoIncrement:  true
    },
    tarea: Sequelize.STRING,
    estado: Sequelize.INTEGER
});
Tareas.belongsTo(Proyectos); //o Proyectos.hasMany(Tareas)
module.exports = Tareas;