
import jwt from "jsonwebtoken";
import joi from 'joi';
import bcrypt from "bcrypt";
import { db } from "./../database/mongo.js"


async function createUser(req, res) {

  const user = req.body;
  console.log(user);

  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    cpf: joi.string().pattern(new RegExp('^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$')).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')).required(),
    confirmPassword: joi.ref('password')
  })

  const { error } = userSchema.validate(user, { abortEarly: false });

  console.log(error);

  if(error) {
    return res.sendStatus(422);
  }

  try {

    const passwordEncrypted = bcrypt.hashSync(user.password, 10);
    const confirmPasswordEncrypted = bcrypt.hashSync(user.confirmPassword, 10);

    await db.collection('users').insertOne({
      ...user,
      password: passwordEncrypted,
      confirmPassword: confirmPasswordEncrypted
    });

    res.status(201).send("User created successfully!"); 
  } catch (error) {
    console.error('There was a problem registering the user. Check the data entered.');
    res.status(500).send('There was a problem registering the user. Check the data entered.')
  }
}


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

export { createUser, login };

