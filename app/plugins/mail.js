'use strict';

const Joi = require('joi');
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

let mailGenerator = new Mailgen({theme: 'neopolitan',
    product: {
        name: 'Lorem ipsum',
        link: 'http://leportfolio.fr'
    }
});

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tpnodenode@gmail.com',
        pass: 'nodetpazerty123'
    }
}, {
    from: 'tpnodenode@gmail.com',
});

function isValidEmail (address) {
    return Joi.string().email().validate(address);
}

function sendMail(toSend) {
    if (Object.prototype.toString(toSend) == '[object Object]' && isValidEmail(toSend.to)) {
        if (toSend.html || toSend.plaintext) {
            return transporter.sendMail(toSend);
        }
    }
}

function newUser(user) {
    let email = {
        body: {
            name: user.firstname,
            intro: 'Salut hein'
            + 'Login: ' + user.login + ' Password: ' + user.password,
            outro: 'bonne nuit hein'
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailPlainText = mailGenerator.generatePlaintext(email);

    let message = {
        to: user.email,
        subject: 'Ceci est une newsletter',
        text: emailPlainText,
        html: emailBody
    };
    sendMail(message);
}

function editedUser(user) {
    let email = {
        body: {
            name: user.firstname,
            intro: 'profile mit à jour',
            outro: 'bon soir hein'
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailPlainText = mailGenerator.generatePlaintext(email);

    let message = {
        to: user.email,
        subject: 'profile mit à jour',
        text: emailPlainText,
        html: emailBody
    };
    sendMail(message);
}

function resetedPassword(user, pwd) {
    let email = {
        body: {
            name: user.firstname,
            intro: 'new password : ' + pwd,
            outro: 'A plus hein'
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailPlainText = mailGenerator.generatePlaintext(email);

    let message = {
        to: user.email,
        subject: 'votre mot de passe',
        text: emailPlainText,
        html: emailBody
    };
    sendMail(message);
}

const mailplugin = {
    register(server, options, next) {
        server.decorate( 'server', 'sendMail', sendMail );
        server.decorate( 'server', 'alertNewUser', newUser );
        server.decorate( 'server', 'alertEditedUser', editedUser );
        server.decorate( 'server', 'sendResetedPassword', resetedPassword );
        next();
    }
};

mailplugin.register.attributes = {
    name: 'mailplugin',
    version: '0.0.999'
};

module.exports = mailplugin;
