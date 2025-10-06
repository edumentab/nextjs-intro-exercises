// Dynamic segment with SSR fetch + generateMetadata for SEO.
// Also demonstrates composing Client and Server components (AddToCartForm).
// In simple terms: server fetches product by id; set <title> server-side; 404 if missing.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/db";
import { formatEuros } from "@/lib/format";
import { AddToCartForm } from "@/app/(shop)/products/[id]/AddToCartForm";

type Params = { params: { id: string } };

// generateMetadata is a function that generates metadata for a product page.
// It is used to set the title and description of a product page.
// It is a server-side function that is called when the product page is rendered.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} - Mini Shop`,
    description: p.description,
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <article className="space-y-3">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-700">{product.description}</p>
      <p className="font-medium">{formatEuros(product.price)}</p>

      {/* Client component calls a Server Action to mutate the cart */}
      <AddToCartForm productId={product.id} />

      <hr className="my-4" />
      <section className="space-y-2">
        {/* Exercise 2: Streamed related products */}
        {/*
          Instructions:
          - This section streams independently using a Suspense boundary.
          Docs:
          - Suspense: https://react.dev/reference/react/Suspense
          - Loading UI & streaming: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
        */}
      </section>
    </article>
  );
}
