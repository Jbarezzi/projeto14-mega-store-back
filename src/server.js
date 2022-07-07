import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute"

const app = express();

app.use(cors(), express.json());

app.use(authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT);