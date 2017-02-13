/**
 * Created by bromr on 01/02/2017.
 */
'use strict';
const Joi = require('joi');
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
                handler: handler.add
            }
        },
        {
            method: 'GET',
            path: '/users',
            config: {
                description: 'la route qui montre les utilisateurs',
                notes: 'toutes les routes mènent à Rome',
                tags: ['api'],
                handler: handler.getUsers
            }
        },
        {
            method: 'DELETE',
            path: '/user/{id}',
            config: {
                description: 'la route qui supprime un utilisateur',
                notes: 'la route de qui supprime',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string()
                    }
                },
                handler: handler.delUser
            }
        },
        {
            method: 'POST',
            path: '/user/{id}',
            config: {
                description: 'la route pour change un utilisateur',
                notes: 'le changement cest la route',
                tags: ['api'],
                validate: {
                    payload: userSchema,
                    params:{
                        id: Joi.string()
                    }
                },
                handler: handler.updateUser
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name: 'users-routes'
};
