// API route demonstrating GET (list) and POST (create) with caching hints.
// Use for exercises to compare SSR page vs API and to practice revalidation.
// In simple terms: this is a backend endpoint inside the Next.js app.
// React-only equivalent: you'd build these endpoints in Express/Fastify or mock them.

import { NextResponse } from "next/server";

// Try with cURL in terminal:
// curl http://localhost:4000/api/products
export async function GET(request: Request) {
  return NextResponse.json({
    products: "Not implemented",
  });
}

// Try with cURL in terminal:
// curl http://localhost:4000/api/products -d '{"name":"Book","price":999,"category":"books","description":"A book"}'
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ product: body }, { status: 201 });
}
