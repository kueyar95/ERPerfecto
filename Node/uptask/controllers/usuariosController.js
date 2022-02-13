const Usuarios = require('../models/UsuariosModel');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req,res) =>{
    res.render('crearCuenta',{
        nombrePagina: 'Crear cuenta en UpTask'
    });
}
exports.crearCuenta = async (req,res) =>{
    //Leer datos
    const {email,password} = req.body;

    //Crear usuario
    try {
        await Usuarios.create({
            email,
            password
        });
        
        //Crear URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmarUsuario/${email}`;
        
        //Crear el objeto de usuario
        const usuario = {email}
        //Enviar email
        let opciones = {
            usuario,
            subject: 'Confirma tu cuenta en UpTask',
            confirmarUrl,
            archivo: 'confirmarUsuario'
        };
        //Enviar correo con el token
        await enviarEmail.enviar(opciones);
    
        //Redirigir al usuario
        req.flash('correcto','Enviamos un email a tu correo para que confirmes tu cuenta');
        res.redirect('/iniciarSesion');
    } catch (error) {
        
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta',{
            nombrePagina: 'Crear cuenta en UpTask',
            mensajes: req.flash(),
            email,
            password
        })
    }
}

exports.formIniciarSesion = async (req,res) => {
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión en UpTask',
        error
    })
}

exports.formRestablecerPassword = async (req,res) => {
    res.render('restablecer', {
        nombrePagina: 'Restablecer contraseña'
    })
}
//Activa un usuario
exports.confirmarCuenta = async (req,res) => {
    const usuario = await Usuarios.findOne({
        where: {email: req.params.correo}
    })
    
    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No válido');
        res.redirect('/iniciarSesion');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciarSesion');
}