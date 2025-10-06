// Client component using a Server Action via form actions.
// Exercise 3 Bonus: add optimistic UI (disable button, immediate count increment).
// In simple terms: this is a browser component that calls a server-only function.
// React-only equivalent: handle submit in the client, call fetch('/api/cart'), update local state.

"use client";

import { useTransition, useState } from "react";
import { addToCartAction } from "@/app/(shop)/products/[id]/actions";

export function AddToCartForm({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  /* Docs:
      - Server Actions called from Client Components
      https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
      - useTransition
      https://react.dev/reference/react/useTransition
  */
  const handleSubmit = async () => {
    startTransition(async () => {
      await addToCartAction(productId);
      setAdded(true); // optimistic feedback
      setTimeout(() => setAdded(false), 1200);
    });
  };

  return (
    <form action={handleSubmit}>
      <button
        type="submit"
        className="rounded bg-black px-3 py-1 text-white disabled:opacity-50 hover:bg-gray-800"
        disabled={isPending}
      >
        {isPending ? "Adding…" : "Add to cart"}
      </button>
      {added && <span className="ml-2 text-sm text-green-700">Added!</span>}
    </form>
  );
}
