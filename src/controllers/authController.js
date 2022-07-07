import { db, objectId } from '../database/mongo.js';
import joi from 'joi';
import bcrypt from 'bcrypt';
//import { v4 as uuid } from 'uuid';

export async function createUser(req, res) {

  const user = req.body;
  console.log(user);

  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    cpf: joi.string().pattern(new RegExp('^\d{3}\.\d{3}\.\d{3}\-\d{2}$')).required(),
    password: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')).required(),
    confirmPassword: joi.ref('password')
  })

  const { error } = userSchema.validate(user, { abortEarly: false });

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