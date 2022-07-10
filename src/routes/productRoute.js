import { Router } from "express";

const router = Router();

router.post("/create-product", validateNewProduct, createProduct);
router.get("/products", getProducts);

export default router;