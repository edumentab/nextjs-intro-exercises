// Root layout, imports Tailwind and defines a simple shell.
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Mini Shop",
  description: "Mini Shop showcasing SSR, RSC, Server Actions, and Suspense",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Mini Shop</h1>
            <nav className="flex gap-4 text-sm">
              <a href="/" className="underline">
                Home
              </a>
              <a href="/products" className="underline">
                Products
              </a>
              <a href="/cart" className="underline">
                Cart
              </a>
            </nav>
          </header>
          {/* Docs:
             - App Router overview: https://nextjs.org/docs/app
             - Layouts: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
             - Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
          */}
          <main className="mt-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
