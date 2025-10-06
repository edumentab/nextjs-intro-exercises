"use server";

// Server Actions: mutate cart and revalidate relevant pages.
import { addToCart } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addToCartAction(productId: string) {
  await addToCart(productId, 1);
  // Revalidate cart page so SSR read is fresh next navigation
  revalidatePath("/cart");
}

// Exercise 6: Notes on selective revalidation with tags
// You can revalidate by tag to refresh only data associated with that tag.
// After opting your data reads into a tag (see `lib/db.ts` notes), call:
//
// import { revalidateTag } from "next/cache";
// revalidateTag("cart");
//
// Docs:
// - revalidateTag: https://nextjs.org/docs/app/api-reference/functions/revalidateTag
// - unstable_cache: https://nextjs.org/docs/app/api-reference/functions/unstable_cache
