import { db } from "./../database/mongo.js";

async function createProduct(req, res) {
    const newProduct = req.body
    try {
        const isProductRegistered = await db.collection("products").findOne({ name: newProduct.name });
        if(isProductRegistered) {
            res.status(409).send("O produto já existe na Mega Store!");
        }
        await db.collection("products").insertOne(newProduct);
        res.status(201).send("Produto criado com sucesso");
    } catch(error) {
        res.sendStatus(500);
    }
}

export { createProduct };