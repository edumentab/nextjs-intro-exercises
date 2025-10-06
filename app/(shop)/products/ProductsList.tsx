// Async Server Component doing the actual data fetch (SSR).
import Link from "next/link";
import { listProducts } from "@/lib/db";
import { formatEuros } from "@/lib/format";

type Props = {
  q?: string;
};

export default async function ProductsList({ q }: Props) {
  const products = await listProducts(q);

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {products.map((p) => (
        <li key={p.id} className="rounded border p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-sm text-gray-600">{formatEuros(p.price)}</p>
            </div>
            <Link className="text-sm underline" href={`/products/${p.id}`}>
              View
            </Link>
          </div>
          <p className="mt-2 text-sm">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}
