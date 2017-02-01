/**
 * Created by bromr on 01/02/2017.
 */
'use strict';
const joi = require('joi');
const handler = require('../handlers/user');
const userSchema = require('../schemas/user');

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'POST',
            path: '/user',
            config: {
                description: 'la route pour ajouter des utilisateurs',
                notes: 'Route pour ajouter',
                tags: ['api'],
                validate: {
                    payload: userSchema
                },
                handler: handler.root
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name: 'users-routes'
};
