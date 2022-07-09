import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import categoriesRoute from './routes/categoriesRoute.js'

dotenv.config();

const app = express();
app.use(cors(), express.json());
app.use(authRoute);
app.use(categoriesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});