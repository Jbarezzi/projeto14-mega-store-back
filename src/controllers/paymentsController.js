import { db, objectId } from '../database/mongo.js';
import joi from 'joi';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
//import { v4 as uuid } from 'uuid';


export async function createPayments(req, res) {

  const payment = req.body;

  const { authorization } = req.headers; 
  const token = authorization?.replace('Bearer ', '');


  const cardNumberEncrypted = bcrypt.hashSync(payment.cardNumber, 10);
  const securityNumberEncrypted = bcrypt.hashSync(payment.securityNumber, 10);
  const expirationDateEncrypted = bcrypt.hashSync(payment.expirationDate, 10);


  const session = await db.collection('sessions').findOne({ token });

  if(!session) {
    return res.sendStatus(401); 
  }

  await db.collection('payments')
  .insertOne({ 
    ...payment,
    cardNumber: cardNumberEncrypted,
    securityNumber: securityNumberEncrypted,
    expirationDate: expirationDateEncrypted,
    dayMonthYear: dayjs().format("DD/MM/YYYY"),
    userId: session.userId});

  const payments = await db.collection('payments')
  .find({ userId: new objectId(session.userId) }).toArray();

  console.log(payments);

  res.send(payments);
}

export async function getPayments(req, res) {
  const session = res.locals.session; 

  const payments = await db
  .collection('payments')
  .find({ userId: new objectId(session.userId)})
  .toArray(); 

  res.send(payments); 
}