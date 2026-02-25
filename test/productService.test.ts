import * as productService from "../src/api/v1/services/productService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Product Service", () => {
  it("should create product successfully", async () => {
    const mockData = { name: "Test", sku: "TES1234", quantity: 10, price: 9.99, category: "tools" };
    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue({ ...mockData, id: "123" });

    const result = await productService.createProduct(mockData);
    expect(result.id).toBe("123");
  });
});