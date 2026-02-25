import { Product } from "../models/productModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

// Firestore collection name for products
const PRODUCTS_COLLECTION = "products";

// Type for creating a new product (id + timestamps are created by backend)
type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

// Type for updating a product (cannot change id/sku/timestamps directly)
type UpdateProductInput = Partial<
  Omit<Product, "id" | "sku" | "createdAt" | "updatedAt">
>;

// Create a new product
export const createProduct = async (
  productData: CreateProductInput
): Promise<Product> => {
  try {
    const now = new Date();

    const fullData = {
      ...productData,
      createdAt: now,
      updatedAt: now,
    };

    return await firestoreRepository.createDocument<Product>(
      PRODUCTS_COLLECTION,
      fullData as Product
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create product: ${errorMessage}`);
  }
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await firestoreRepository.getAllDocuments<Product>(PRODUCTS_COLLECTION);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get all products: ${errorMessage}`);
  }
};

// Get one product by id
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    return await firestoreRepository.getDocumentById<Product>(PRODUCTS_COLLECTION, id);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get product ${id}: ${errorMessage}`);
  }
};

// Update product (sku + timestamps are protected)
export const updateProduct = async (
  id: string,
  productData: UpdateProductInput
): Promise<Product | null> => {
  try {
    const now = new Date();

    const fullData = {
      ...productData,
      updatedAt: now, // always update timestamp
    };

    // updateDocument returns void, so we await it first
    await firestoreRepository.updateDocument<Product>(PRODUCTS_COLLECTION, id, fullData);

    // then fetch and return updated document
    return await firestoreRepository.getDocumentById<Product>(PRODUCTS_COLLECTION, id);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update product ${id}: ${errorMessage}`);
  }
};

// Delete product by id
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await firestoreRepository.deleteDocument(PRODUCTS_COLLECTION, id);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete product ${id}: ${errorMessage}`);
  }
};