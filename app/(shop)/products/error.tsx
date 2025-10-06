"use client";

// [Bonus] Route error boundary for products
// Docs: https://nextjs.org/docs/app/building-your-application/routing/error-handling

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-3">
      <p className="font-medium text-red-700">
        Something went wrong loading products.
      </p>
      <p className="text-sm text-red-700/80">{error.message}</p>
      <button
        className="mt-2 rounded bg-red-700 px-3 py-1 text-white"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
