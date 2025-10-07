import path from "path";
import { promises as fs } from "fs";
import { Product, CartItem } from "./types";

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "TypeScript Handbook",
    price: 2999,
    category: "books",
    description: "Deep dive into TS.",
  },
  {
    id: "p2",
    name: "Next.js 15 Guide",
    price: 3999,
    category: "books",
    description: "App Router and SSR.",
  },
  {
    id: "p3",
    name: "Noise-canceling Headphones",
    price: 15999,
    category: "electronics",
    description: "Focus better.",
  },
  {
    id: "p4",
    name: "Classic Denim Jacket",
    price: 7999,
    category: "fashion",
    description: "Timeless style for any season.",
  },
  {
    id: "p5",
    name: "Wireless Mouse",
    price: 2499,
    category: "electronics",
    description: "Ergonomic and portable.",
  },
  {
    id: "p6",
    name: "JavaScript: The Good Parts",
    price: 2599,
    category: "books",
    description: "A classic for JS developers.",
  },
];

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CART_FILE = path.join(DATA_DIR, "cart.json");

async function writeProductsToDisk(products: Product[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
}

async function readProductsFromDisk(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(PRODUCTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid products file");
    }
    return parsed;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      // First run: seed the store with defaults and persist them immediately.
      await writeProductsToDisk(DEFAULT_PRODUCTS);
      return [...DEFAULT_PRODUCTS];
    }
    throw err;
  }
}

export async function readProducts(): Promise<Product[]> {
  return readProductsFromDisk();
}

export async function saveUpdatedProducts(products: Product[]) {
  await writeProductsToDisk(products);
}

async function readCartFromDisk(): Promise<CartItem[]> {
  try {
    const raw = await fs.readFile(CART_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeCartToDisk(cart: CartItem[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CART_FILE, JSON.stringify(cart, null, 2), "utf8");
}

export async function readCart(): Promise<CartItem[]> {
  return readCartFromDisk();
}

export async function saveUpdatedCart(cart: CartItem[]) {
  await writeCartToDisk(cart);
}

export function normalizeRequestedQuantity(quantity: number): number {
  // Clamp to integers. Return 0 to signal removal.
  if (!Number.isFinite(quantity)) return 0;
  return Math.max(0, Math.floor(quantity));
}
