const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const userValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(user)
}

const loginValidation = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(user)
}

module.exports.loginValidate = loginValidation
module.exports.userValidate = userValidation
module.exports.User = mongoose.model('User', userSchema)