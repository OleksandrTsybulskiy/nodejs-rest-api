import Joi from "joi";

const contactAddScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const contactUpdateScheme = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})

export default {
    contactAddScheme,
    contactUpdateScheme
}