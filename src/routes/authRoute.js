import { Router } from "express";
import validateLogin from "../middlewares/schemas/validateLogin.js";
import { login } from "./../controllers/authController.js"

const router = Router();

router.post("/login", validateLogin, login);

export default router;