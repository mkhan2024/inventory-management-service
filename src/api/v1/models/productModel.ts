export interface Product {
  id: string;           // from firestore
  name: string;
  sku: string;          // ELE1234 format
  quantity: number;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}