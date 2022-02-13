const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
});
//Generar HTML
const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}

exports.enviar = async (opciones) =>{
    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.htmlToText(html);
    // send mail with defined transport object
    let emailOptions = await transporter.sendMail({
        from: 'UpTask <no-reply@uptask.com>',
        to: opciones.usuario.email,
        subject: opciones.subject, // Subject line
        text, // plain text body
        html // html body
    });
}
