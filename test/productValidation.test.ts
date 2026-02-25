import { productSchemas } from "../src/api/v1/validation/productValidation";
import Joi from "joi";

describe("Product Validation", () => {
  const schema = productSchemas.create.body as Joi.ObjectSchema;

  it("should pass for valid product data", () => {
    const validData = {
      name: "Wireless Mouse",
      sku: "ELE1234",
      quantity: 150,
      price: 29.99,
      category: "electronics",
    };
    const { error } = schema.validate(validData);
    expect(error).toBeUndefined();
  });

  it("should fail for bad SKU", () => {
    const badData = { 
      name: "Test", 
      sku: "abc123", 
      quantity: 10, 
      price: 10, 
      category: "electronics" 
    };
    const { error } = schema.validate(badData);
    expect(error).toBeDefined();
  });
});