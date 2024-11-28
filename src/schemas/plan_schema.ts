import Joi from "joi";

const validatePlan: Joi.ObjectSchema = Joi.object({
    age: Joi.number().min(14).required().messages({
        'number.min': "You shouldn't work out at the gym until you're 15"
    }),
    weight: Joi.number().required(),
    height: Joi.number().required(),
    daysOfTraining: Joi.number().min(1).max(7).required(),
    goal: Joi.string().valid('perder peso', 'ganar músculo', 'mantenerse').required().messages({
        'any.only': "Please select between perder peso, ganar músculo and mantenerse"
    }),
})

export default validatePlan