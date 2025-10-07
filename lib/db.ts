// Simple product store + file-backed cart persistence.
// We simulate network latency and expose small helpers with clear cache hints.
// NOTE: Both products and cart items are stored on disk so restarts keep state.
// In production, replace this with a real database or service.

import {
  readCart,
  readProducts,
  normalizeRequestedQuantity,
  sleep,
  saveUpdatedCart,
  saveUpdatedProducts,
} from "./db-helpers";
import { CartItem, Category, Product } from "./types";

export async function listProducts(
  q?: string,
  category?: Category
): Promise<Product[]> {
  // simulate latency to showcase Suspense/streaming
  await sleep(600);
  const products = await readProducts();
  let result = products;
  if (category) result = result.filter((p) => p.category === category);
  if (q) {
    const s = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
    );
  }
  return result;
}

// Optional: wrap reads with unstable_cache and tags for selective revalidation
// Example:
// import { unstable_cache } from "next/cache";
// export const cachedListProducts = unstable_cache(listProducts, ["products-list"], {
//   tags: ["products-list"],
// });
// Then call revalidateTag("products-list") after creating a product.
// Docs: https://nextjs.org/docs/app/api-reference/functions/unstable_cache

export async function getProduct(id: string): Promise<Product | undefined> {
  await sleep(400);
  const products = await readProducts();
  return products.find((p) => p.id === id);
}

export async function createProduct(p: Omit<Product, "id"> & { id?: string }) {
  await sleep(300);
  const id = p.id ?? `p${Math.random().toString(36).slice(2, 7)}`;
  const newProduct = { ...p, id };
  const products = await readProducts();
  const updatedProducts = [newProduct, ...products];
  await saveUpdatedProducts(updatedProducts);
}

export async function getCart(): Promise<CartItem[]> {
  await sleep(300);
  const cart = await readCart();
  return cart.map((item) => ({ ...item }));
}

export async function addToCart(id: string, quantity: number = 1) {
  await sleep(300);
  const cart = await readCart();
  const existing = cart.find((c) => c.id === id);
  // if the item is in the cart, update its quantity
  // if the item is not in the cart, add it
  const updatedCart = existing
    ? cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + quantity } : item
      )
    : [...cart, { id, quantity }];
  await saveUpdatedCart(updatedCart);
}

/**
 * Updates the quantity of an item in the cart
 * @param id the id of the item to update
 * @param quantity the new quantity of the item
 *
 * @example
 * setCartItemQuantity("123", 2);
 */
export async function setCartItemQuantity(id: string, quantity: number) {
  await sleep(300);
  const cart = await readCart();
  const normalizedQuantity = normalizeRequestedQuantity(quantity);
  // if normalizedQuantity is 0, remove the item from the cart
  // if normalizedQuantity is not 0, update the item's quantity
  // if the item is not in the cart, add it
  // if the item is in the cart, update its quantity
  const updatedCart = normalizedQuantity
    ? cart.some((item) => item.id === id)
      ? cart.map((item) =>
          item.id === id ? { ...item, quantity: normalizedQuantity } : item
        )
      : [...cart, { id, quantity: normalizedQuantity }]
    : cart.filter((item) => item.id !== id);
  await saveUpdatedCart(updatedCart);
}

/**
 *
 * Removes an item from the cart
 * @param id the id of the item to remove
 *
 * @example
 * removeFromCart("123");
 */
export async function removeFromCart(id: string) {
  await sleep(300);
  const cart = await readCart();
  const updatedCart = cart.filter((item) => item.id !== id);
  await saveUpdatedCart(updatedCart);
}
