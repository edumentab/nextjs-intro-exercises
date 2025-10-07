export type Category = "books" | "electronics" | "fashion";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
};

export type CartItem = { id: string; quantity: number };
