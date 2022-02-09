const Sequelize = require("sequelize");
const slug = require('slug');
const db = require("../config/db");
const {nanoid} = require('nanoid');

const Proyectos = db.define("proyectos",{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING,
    }
},{
    //Antes de realizar la inserción corre este hook que puede realizar varias acciones
    hooks: {
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre);
            proyecto.url = `${url}-${nanoid(4)}`;
        }
    }
});

module.exports = Proyectos;