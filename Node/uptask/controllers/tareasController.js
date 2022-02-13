const Proyectos = require('../models/ProyectosModel');
const Tareas = require('../models/TareasModel');

exports.nuevaTarea = async (req,res, next) => {
    //Obtener el proyecto en el que se añadirá la tarea
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});

    //Leer el input y obtener los datos necesarios
    const {tarea} = req.body;
    const estado = 0; //estado = 0 => incompleto || estado = 1 => completo
    const proyectoId = proyecto.id;

    //Insertar en la bd
    const resultado = await Tareas.create({tarea, estado, proyectoId});
    if(!resultado){
        return next();
    }
    //Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.actEstadoTarea = async (req,res,next) => {
    //Con patch no sirve req.query
    const {id} = req.params;
    const tarea = await Tareas.findOne({ where: {id}});

    //Cambiar estado tarea
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }

    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado){
        return next();
    }
    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async(req,res,next) => {
    //En delete sirve params o query
    const {id} = req.params;

    //Eliminar tarea
    const resultado = await Tareas.destroy({where: {id}});

    if(!resultado){
        return next();
    }

    res.status(200).send('Tarea eliminada correctamente');
}