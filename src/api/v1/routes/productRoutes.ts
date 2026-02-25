import express from "express";
import { validateRequest } from "../middleware/validateRequest";
import * as productController from "../controllers/productController";
import { productSchemas } from "../validation/productValidation";

const router = express.Router();

router.get("/health", productController.healthCheck);

router.get(
  "/products",
  validateRequest(productSchemas.list),
  productController.getAllProducts
);

router.get(
  "/products/:id",
  validateRequest(productSchemas.getById),
  productController.getProductById
);

router.post(
  "/products",
  validateRequest(productSchemas.create),
  productController.createProduct
);

router.put(
  "/products/:id",
  validateRequest(productSchemas.update),
  productController.updateProduct
);

router.delete(
  "/products/:id",
  validateRequest(productSchemas.delete),
  productController.deleteProduct
);

export default router;