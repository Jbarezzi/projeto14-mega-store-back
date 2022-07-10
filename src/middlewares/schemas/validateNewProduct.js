import Joi from "joi";
import validateJoiSchema from "../validateJoiSchema.js";

function validateNewProduct(req, res, next) {
    const productSchema = Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim(),
        price: Joi.number().positive().required(),
        image: Joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg))/i).trim().required(),
        categories: Joi.string().required(),
        discount: Joi.number().positive(),
        promotion: Joi.boolean(),
    });

    validateJoiSchema(productSchema, req.body, res, next);
}

export default validateNewProduct;