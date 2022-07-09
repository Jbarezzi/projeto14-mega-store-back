
//import { createUser } from "../controllers/authController.js";

import { Router } from "express";
import validateLogin from "../middlewares/schemas/validateLogin.js";
import { createUser, login } from "./../controllers/authController.js"

const router = Router();

router.post('/sign-up', createUser); 
router.post("/login", validateLogin, login);

export default router;