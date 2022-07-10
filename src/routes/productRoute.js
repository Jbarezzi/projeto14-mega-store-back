import { Router } from "express";

const router = Router();

router.post("/create-product", validateNewProduct, createProduct);

export default router;