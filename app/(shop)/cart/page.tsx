// SSR read of server state that is revalidated after Server Action.

import Link from "next/link";
import { getCart, getProduct } from "@/lib/db";
import { formatEuros } from "@/lib/format";

export default async function CartPage() {
  const cart = await getCart();
  const lines = await Promise.all(
    cart.map(async (line) => {
      const p = await getProduct(line.id);
      return p ? { ...line, product: p } : null;
    })
  );
  const items = lines.filter(Boolean) as Array<{
    id: string;
    quantity: number;
    product: { name: string; price: number };
  }>;
  const total = items.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link href="/products" className="underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Your cart</h2>
      <ul className="space-y-2">
        {items.map((l) => (
          <li key={l.id} className="flex items-center justify-between">
            <span>
              {l.product.name} × {l.quantity}
            </span>
            <span>{formatEuros(l.product.price * l.quantity)}</span>
            {/* Exercise 3: quantity/remove controls (client) */}
            {/* <CartLineControls id={l.id} quantity={l.quantity} /> */}
          </li>
        ))}
      </ul>
      <p className="font-medium">Total: {formatEuros(total)}</p>
    </section>
  );
}
