import { Router } from "express";
import { createProduct } from "../controllers/productsController";
import validateNewProduct from "../middlewares/productsSchemas/validateNewProduct";

const router = Router();

router.post("/create-product", validateNewProduct, createProduct);

export default router;