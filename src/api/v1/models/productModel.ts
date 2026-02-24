export interface Product {      // interface = shape of our product data
  id: string;                   // unique ID from Firestore
  name: string;                 // product name
  sku: string;                  // special code like ELE1234
  quantity: number;             // how many we have in stock
  price: number;                // price of one item
  category: string;             // electronics, clothing, etc.
  createdAt: Date;              // when we added it
  updatedAt: Date;              // when we last changed it
}