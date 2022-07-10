import { db } from "./../database/mongo.js";

async function createProduct(req, res) {
    const newProduct = req.body
    try {
        const isProductRegistered = await db.collection("products").findOne({ name: newProduct.name });
        if(isProductRegistered) {
            res.status(409).send("O produto já existe na Mega Store!");
            return;
        }
        await db.collection("products").insertOne(newProduct);
        res.status(201).send("Produto criado com sucesso");
    } catch(error) {
        res.sendStatus(500);
    }
}

async function getProducts(req, res) {
    const orderByPrice = parseInt(req.query.orderByPrice) || 1;   
    const products = await db.collection("products").find().sort({ price: orderByPrice }).toArray();
    res.send(products);
}

async function getPromotionProducts(_req, res) {
    const products = await db.collection("products").find({ promotion: true }).toArray();
    res.send(products);
}

export { createProduct, getProducts, getPromotionProducts };