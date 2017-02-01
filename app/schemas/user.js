'use strict';

const Joi = require('joi');

var schema = Joi.object({
    login       : Joi.string().alphanum().required(),
    password    : Joi.string().alphanum().min(8).required(),
    email       : Joi.string().email().required(),
    firstname   : Joi.string(),
    nir         : Joi.number()
});

module.exports = schema;