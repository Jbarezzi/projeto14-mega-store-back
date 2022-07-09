import Joi from "joi";
import validateJoiSchema from "./../validateJoiSchema.js";

function validateLogin(req, res, next) {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    validateJoiSchema(loginSchema, req.body, res, next);
}

export default validateLogin;