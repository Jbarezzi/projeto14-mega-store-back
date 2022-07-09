import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "./../database/mongo.js"

async function login(req, res) {
    const { email, password } = req.body;
    const isUserValid = await db.collection("users").findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(password, isUserValid.password);
    if(isUserValid && isPasswordValid) {
        const data = {
            userId: isUserValid._id,
            email,
        };
        const secretKey = process.env.JWT_SECRET;
        const tokenConfig = { expiresIn: process.env.JWT_EXPIRES_IN };
        const session = {
            userId: isUserValid._id,
            token: jwt.sign(data, secretKey, tokenConfig)
        };
        await db.collection("sessions").insertOne(session);
        res.status(201).send({ token: `Bearer ${session.token}` });
        return;
    }        
    res.status(401).send("Senha ou email incorretos!");
}

export { login };