const Proyectos = require('../models/ProyectoModels');
//const slug = require('slug');

exports.proyectosHome = async (req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render("index",{
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async(req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req,res) =>{
    //Validar que tengamos algo en el input
    const nombre = req.body.nombre;
    let errores = [];
    if(!nombre){
        errores.push({'text': 'Agrega un nombre al proyecto'});
    }
    //Si hay errores...
    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    }else{
        //Insertar en bbdd
            //Si hay proyectos iguales, las url quedan iguales y eso crea problemas, es mejor usar hook
            //const url = slug(nombre);
        await Proyectos.create({nombre/*,url*/});
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req,res,next)=>{
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where:{
            url: req.params.url
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
    if(!proyecto) return next();

    //Render a la vista
    res.render('tareas',{
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async(req,res) =>{
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where:{
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
    if(!proyecto) return next();
    //Render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req,res) =>{
    //Validar que tengamos algo en el input
    const nombre = req.body.nombre;
    let errores = [];
    if(!nombre){
        errores.push({'text': 'Agrega un nombre al proyecto'});
    }
    //Si hay errores...
    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    }else{
        //Actualizar en bbdd
        await Proyectos.update(
            {nombre: nombre},
            { where: {id: req.params.id}}
            );
        console.log("actualizado");
        res.redirect('/');
    }
}
