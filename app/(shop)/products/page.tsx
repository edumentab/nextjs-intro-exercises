// SSR page with Suspense and a route-level loading UI.
// In simple terms: the server renders the page; Suspense shows a skeleton while list loads.
// React-only equivalent: manage `loading` state with useEffect, show <Skeleton /> until data arrives.

import { Suspense } from "react";
import ProductsList from "./ProductsList";
import { Skeleton } from "@/app/components/Skeleton";
// Optional bonus component (uncomment to use):
// import DebouncedSearchInput from "./DebouncedSearchInput";

type Props = {
  searchParams?: {
    category?: string;
    q?: string;
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  /*
    The data fetching is called from ProductsList, using the URL parameters.
    URL parameters are set by the form, which is a default behavior of the browser.
  */

  // Note: check devtools warning
  const { q } = searchParams ?? {};

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Products</h2>
      {/* Exercise 1: extend filters using searchParams */}
      {/*
        Instructions:
        - Add more filters (category) and keep them encoded in the URL via the form.
        - Read values from `searchParams` and pass them down to the async list.
        Docs:
        - searchParams in App Router: https://nextjs.org/docs/app/building-your-application/routing/defining-routes#search-params
        - Data fetching in Server Components: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
      */}
      <form className="flex flex-wrap items-center gap-2">
        <input
          className="border px-2 py-1"
          name="q"
          placeholder="Search…"
          defaultValue={q}
        />
        <button
          className="rounded bg-black px-3 py-1 text-white hover:bg-gray-800"
          type="submit"
        >
          Filter
        </button>
      </form>

      {/* 
        Tip: This form submits as a GET and updates the URL.
        The server reads searchParams and streams results below.
      */}

      {/* [Bonus] Debounced search (client) */}
      {/*
        Hint: Replace the text input above with this client component to debounce
        URL updates for better UX. It pushes `q` changes via router, then the
        server re-renders with the new `searchParams`.
      */}

      {/* <DebouncedSearchInput initialValue={q} /> */}

      <Suspense fallback={<Skeleton rows={4} />}>
        {/* Streaming boundary: child is async and will stream when ready */}
        <ProductsList q={q} />
      </Suspense>
    </section>
  );
}
