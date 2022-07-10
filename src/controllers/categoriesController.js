import { db } from '../database/mongo.js';
import joi from 'joi';

async function createCategories(req, res) { 

  const category = req.body;

  const categorySchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required()
  });

  const { error } = categorySchema.validate(category);

  if(error) {
    return res.sendStatus(422); 
  }

  try {
    await db.collection('categories').insertOne(category)
    res.status(201).send('Category created successfully!')
  } catch (error) {
    return res.status(422).send("Couldn't create category!");
  }
}

async function getCategories(req, res) { 

  const categoriesDB = await db
    .collection('categories')
    .find({})
    .toArray();

  res.send(categoriesDB);

}

export { createCategories, getCategories };