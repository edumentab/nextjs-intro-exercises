// SSR RSC home page.

// Exercise 5: Add a streamed "Top sellers" section below using Suspense.
// Instructions:
// - Create an async Server Component `TopSellers.tsx` that waits (sleep) and returns a simple list.
// - Wrap it with <Suspense fallback={<Skeleton rows={3} />}>
// Docs:
// - Suspense: https://react.dev/reference/react/Suspense
// - Loading UI & streaming: https://nextjs.org/docs/app/api-reference/file-conventions/loading

export default async function HomePage() {
  return (
    <section className="prose">
      <h2>Welcome to Our Webshop</h2>
      <p>
        Discover a variety of products across books, electronics, and fashion.
      </p>
      <p>
        Browse our{" "}
        <a href="/products" className="underline">
          Products
        </a>{" "}
        to get started.
      </p>
    </section>
  );
}
