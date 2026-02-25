import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const healthCheck = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getAllProducts();
    res.status(HTTP_STATUS.OK).json({
      message: "Products retrieved",
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Product retrieved",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Product created",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    res.status(HTTP_STATUS.OK).json({
      message: "Product updated",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(HTTP_STATUS.OK).json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};