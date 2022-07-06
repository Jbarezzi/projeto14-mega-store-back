import express from "express";
import cors from "cors";

const app = express();

app.use(cors(), express.json());

app.use(userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT);