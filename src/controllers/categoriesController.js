import { db } from '../database/mongo.js';

export async function getCategories(req, res) { 

  const categories = [
     {name: "Casa",
     description: "itens para casa em geral"
     },
     {name: "Escritório",
     description: "itens para escritório em geral"
     },
     {name: "Informática",
     description: "itens para informática em geral"
     },
     {name: "Escolar",
     description: "itens de material escolar em geral"
     },
     {name: "Esportes",
     description: "itens para prática de esportes em geral"
     },
     {name: "Livros",
     description: "itens de livros em geral"
     },
  ]

  await db.collection('categories').insertOne({
    categories
  });

  const categoriesDB = await db
    .collection('categories')
    .find({})
    .toArray();

  res.send(categoriesDB);

}