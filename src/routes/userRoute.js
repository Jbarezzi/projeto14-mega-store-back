import { Router } from "express";
import validateLogin from "../middlewares/schemas/validateLogin";

const router = Router();

router.post("/login", validateLogin, login);

export default router;