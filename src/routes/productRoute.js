import { Router } from "express";
import validateNewProduct from "./../middlewares/schemas/validateNewProduct.js";
import { createProduct } from "../controllers/productController.js";


const router = Router();

router.post("/create-product", validateNewProduct, createProduct);
router.get("/products", getProducts);

export default router;