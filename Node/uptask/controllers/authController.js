const passport = require('passport');
const Usuarios = require('../models/UsuariosModel');
const crypto = require('crypto');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const enviarEmail = require('../handlers/email');
//Autenticar usuario
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciarSesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Proteger rutas de usuarios no logueados
exports.usuarioAutenticado = (req,res,next) => {
    //Si usuario está autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }
    //Si no lo está, redirigir a iniciarSesion
    return res.redirect('/iniciarSesion');
}

//Cerrar sesión
exports.cerrarSesion = (req,res) => {
    req.session.destroy(()=>{
        res.redirect('/iniciarSesion');
    })
}
//Genera token si el usuario es válido
exports.enviarToken = async (req,res) => {
    //Verifica que el usuario existe
    const {email} = req.body;
    console.log({email});
    const usuario = await Usuarios.findOne({where: {email}});
    
    //Si no hay usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta');
        res.render('restablecer',{
            nombrePagina: 'Reestablecer tu contraseña',
            mensajes: req.flash()
        });
    }
    //Usuario existe
    usuario.token  = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 360000;

    await usuario.save();

    //URL de reset
    const resetUrl = `http://${req.headers.host}/restablecerPassword/${usuario.token}`;
    let opciones = {
        usuario,
        subject: 'Restablecer password',
        resetUrl,
        archivo: 'restablecerPassword'
    };
    //Enviar correo con el token
    await enviarEmail.enviar(opciones);

    //Redirigir
    req.flash('correcto',`Se envió un e-mail a tu correo ${usuario.email}`);
    res.redirect('/iniciarSesion');
}

exports.formresetPassword = async (req,res) => {
    const usuario = await Usuarios.findOne({where: {token: req.params.token}});
    
    //Si no encuentra el usuario
    if(!usuario){
        req.flash('error', 'Token no válido');
        res.redirect('/restablecerPassword');
    }
    //Formulario para generar nuevo password
    res.render('resetPassword',{
        nombrePagina: 'Restablecer contraseña'
    })
}

exports.resetPassword = async (req,res) => {
    //Verificar token válido y fecha de expiración
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });
    if(!usuario){
        req.flash('error','Token no válido o expirado');
        res.redirect('/restablecerPassword');
    }

    //Hashear password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;
    
    //Guardar nuevo password
    await usuario.save();
    req.flash('correcto', 'Tu contraseña se ha actualizado correctamente');
    res.redirect('/iniciarSesion');
}