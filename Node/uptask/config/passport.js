const passport = require('passport');
const { vardump } = require('../helpers');
const localStrategy = require('passport-local').Strategy;

//Referencia al modelo a autenticar
const Usuarios = require('../models/UsuariosModel');

//local stategy - login con credenciales propias(usuario y password)

passport.use(
    new localStrategy(
        //por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email,password,done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }
                });
                //El usuario existe, pero password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false, {
                        message: 'Password incorrecto'
                    })
                }
                //Usuario existe y password correcto
                return done(null,usuario);
            } catch (error) {
                //El usuario no existe
                return done(null,false, {
                    message: 'El e-mail no tiene una cuenta asociada'
                })
            }
        }
    )
);

//Serializar el usuario
passport.serializeUser((usuario,callback) =>{
    callback(null,usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario,callback) =>{
    callback(null,usuario);
});

//Exportar
module.exports = passport;