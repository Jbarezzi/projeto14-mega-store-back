import Joi from "joi";

function validateNewProduct(req, res, next) {
    const newProductSchema = Joi.object({
        name: Joi.string().trim().required(),
        image: Joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg))/i),
        
    });
}

export default validateNewProduct;