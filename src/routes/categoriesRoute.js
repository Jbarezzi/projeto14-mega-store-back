import { createCategories, getCategories } from "../controllers/categoriesController.js";
import { Router } from "express";

const router = Router();


router.post('/categories', createCategories);
router.get('/categories', getCategories); 

export default router;