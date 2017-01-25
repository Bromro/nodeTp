'use strict';

const jsonToMongoose = require('json-mongoose');
const mongoose = require('k7-mongoose').mongoose();
const async             = require('async');
const bcrypt            = require('bcrypt');

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'user',
    schema      : require('../schemas/create_users'),
    autoinc     : {
        field : '_id'
    },
    pre         : {
        save : (doc, next) => {
            async.parallel({
                password : done => {
                    bcrypt.hash(doc.password, 10, (err, hash) => {
                        if (err) {
                            return next(err);
                        }
                        doc.password = hash;
                        done();
                    });
                }
            }, next);
        }
    },
    schemaUpdate : (schema) => {
        schema.login.unique         = true;
        schema.emailAddress.unique  = true;

        return schema;
    },
    transform : (doc, ret, options) => {
        delete ret.password;

        return ret;
    },
    options : {

    }
});
