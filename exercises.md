# Exercises

## Before you start

- Run the exercise app:
  - In a terminal: `npm install` and `npm run dev`
  - Open `http://localhost:4000`
- You will edit files in `/app`.
- After each change, test in the browser and try a quick refresh plus navigation.
- Make sure you have deselected "Disable cache" in the browser dev tools.
  This interferes with revalidating the data in the exercises.

## Conventions for these exercises

- "Where" points to exact files/dirs to edit.
- Test each step. Verify URL and UI state.
- Each exercise has hints to guide you.
- Only do bonus if you're done with the exercise.

---

## Table of Contents

- [Exercise 1: Extend filters on /products](#exercise-1-extend-filters-on-products-using-searchparams)
  - [Bonus: Sorting](#bonus-sorting-after-exercise-1)
  - [Bonus: Search UX with client-side debounce](#bonus-search-ux-with-client-side-debounce-after-exercise-1)
- [Exercise 2: Stream related products with Suspense](#exercise-2-stream-related-products-with-suspense-on-id-page)
  - [Bonus: Second Suspense section (Top in category)](#bonus-second-suspense-section-top-in-category-after-exercise-2)
  - [Bonus: Client Add to cart buttons in the streamed list](#bonus-client-add-to-cart-buttons-in-the-streamed-list-after-exercise-2)
  - [Bonus: Skeleton grid that matches final layout](#bonus-skeleton-grid-that-matches-final-layout-after-exercise-2)
- [Exercise 3: Removable cart lines and quantity update](#exercise-3-removable-cart-lines-and-quantity-update)
  - [Bonus: Optimistic UI for Add to Cart](#bonus-optimistic-ui-for-cart-updates-after-exercise-3)
- [Exercise 4: Create product via API](#exercise-4-post-create-product-via-api)
  - [Bonus: Admin create product form](#bonus-admin-create-product-form-after-exercise-4)
- [Exercise 5: Add a streamed section with Skeleton fallback](#exercise-5-add-a-streamed-section-with-skeleton-fallback)
- [Exercise 6: Tag-based revalidation for cart](#exercise-6-tag-based-revalidation-for-cart)
  - [Exercise 7: Tag-based revalidation for products list](#exercise-7-tag-based-revalidation-for-products-list)
  - [Bonus: Replace anchor tags with Next.js Link](#bonus-replace-anchor-tags-with-nextjs-link)
- [Bonus: Checkout page](#bonus-checkout-page-clear-cart-via-action-redirect-to-confirmation-page)
- [Bonus: Quantity update cart nav link with optimistic UI](#bonus-quantity-update-cart-nav-link-with-optimistic-ui)
- [Bonus: Replace anchor tags with Next.js Link](#bonus-replace-anchor-tags-with-nextjs-link)

---

### [Exercise 1] Extend filters on /products using searchParams

- Where:
  - `/app/(shop)/products/page.tsx`
  - `/app/(shop)/products/ProductsList.tsx`
- Goal:
  - Extend form and `searchParams` on `/products` to filter products by category.
- Steps:

  - Add a select with options for category.

    ```tsx
    <select
      className="border px-2 py-1"
      name="category"
      defaultValue={category}
    >
      <option value="">All</option>
      <option value="books">Books</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
    </select>
    ```

  - Make sure to add the category to the `searchParams` object.
  - Pass the category to the `ProductsList.tsx` component.

- Hints:
  - Keep the URL as the source of truth. Derive UI state from `searchParams`.
- Test:
  - Update filters in the UI and verify the URL updates.
  - Visit `/products?q=phone` and verify results change.
- Read more:
  - Next.js routing and `searchParams`: `https://nextjs.org/docs/app/getting-started/layouts-and-pages#rendering-with-search-params`
  - Fetching data in the App Router: `https://nextjs.org/docs/app/building-your-application/data-fetching/fetching`

### Bonus: Sorting (after Exercise 1)

- Where:
  - Same as Exercise 1.
- Goal:
  - Add `sort` (e.g. price asc/desc) through `searchParams`.
- Hints:

  - Add a select with options for price asc/desc, name asc/desc.
  - See `Exercise 1` for an example of a select component.
  - Create a helper function to sort the products. Put in the `ProductsList.tsx` component. Example:

    ```tsx
    const sorted = (() => {
      if (sort === "price-asc")
        return [...products].sort((a, b) => a.price - b.price);
      if (sort === "price-desc")
        return [...products].sort((a, b) => b.price - a.price);
      if (sort === "name-asc")
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      if (sort === "name-desc")
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      return products;
    })();
    ```

### Bonus: Search UX with client-side debounce (after Exercise 1)

- Where:
  - `/app/(shop)/products/DebouncedSearchInput.tsx` (client component)
  - Use it in `app/(shop)/products/page.tsx`
- Goal:
  - Debounce text input and push URL updates after a short delay (e.g. 500 ms).
- Hints:
  - Use `useState`, `useEffect`, `setTimeout` to debounce.
  - Use `useRouter` to update the URL without full reload.
- Read more:
  - Client Navigation API: `https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#navigating-programmatically`

---

### [Exercise 2] Stream related products with Suspense on [id] page

- Where:
  - `/app/(shop)/products/[id]/page.tsx`
  - Create `/app/(shop)/products/[id]/RelatedProducts.tsx`
  - Use `/app/components/Skeleton.tsx` as fallback
- Goal:
  - Render main product immediately. Stream a "Related products" section separately using `<Suspense>`.
- Steps:
  - Create a server component `related-products.tsx` that fetches related items.
  - Wrap it in `<Suspense fallback={<Skeleton />}>` in `[id]/page.tsx`.
- Hints:
  - See `/app/(shop)/products/page.tsx` for an example of a Suspense boundary.
  - Use the same JSX as the `ProductsList.tsx` component.
  - You can use category to pick related items.
    - example: if fetched product has the category "electronics", you can fetch products with the same category.
  - Double check `listProducts()` parameters order for the correct filtering, and filter them by category in the `RelatedProducts` component.
- Test:
  - Load a product page. Ensure primary details render first and related items pop in after.
- Read more:
  - Streaming and Suspense in Next.js: `https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming`

### Bonus: Second Suspense section (Top in category) (after Exercise 2)

- Where:
  - `/app/(shop)/products/[id]/page.tsx`
  - Create `/app/(shop)/products/[id]/TopInCategory.tsx`
- Goal:
  - Stream two independent sections to showcase sequencing: existing `RelatedProducts` and a new `TopInCategory` section.
- Hints:
  - Keep both as server components.
  - Wrap each in its own `<Suspense>` so they can reveal independently.
  - Use the same card/grid markup as `ProductsList.tsx` for consistency.
  - `TopInCategory` should sort by price and limit to 2 items.
- Example:
  ```tsx
  <Suspense fallback={<Skeleton />}>
    <RelatedProducts product={product} />
  </Suspense>
  <Suspense fallback={<Skeleton />}>
    <TopInCategory category={product.category} />
  </Suspense>
  ```
- Read more:
  - Loading UI and Streaming: `https://nextjs.org/docs/app/api-reference/file-conventions/loading`

### Bonus: Client Add to cart buttons in the streamed list (after Exercise 2)

- Where:
  - `/app/(shop)/products/[id]/RelatedProducts.tsx`
  - Use `/app/(shop)/products/[id]/AddToCartForm.tsx`
- Goal:
  - Add an `Add to cart` button on each related product in the streamed list.
- Hints:
  - Import and render the `AddToCartForm` inside each product card.
  - Pass `productId` for each item.
  - Keep layout stable; place the button under the product title/price.
- Extra
  - Add to `ProductsList.tsx` too.
- Read more:
  - Server Actions from Client Components: `https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations`

### Bonus: Skeleton grid that matches final layout (after Exercise 2)

- Where:
  - `/app/(shop)/products/`
  - Create `/app/components/SkeletonGrid.tsx`
- Goal:
  - Reduce layout shift by making the Suspense fallback mimic the final grid layout.
- Hints:
  - Create a new component `SkeletonGrid.tsx` and use it in the fallback.
  - Use the same grid classes as the product list for consistency.
- Read more:
  - Tailwind CSS grid: `https://tailwindcss.com/docs/display#grid`

---

### [Exercise 3] Removable cart lines and quantity update

- Where:
  - `/app/(shop)/cart/`
- Goal:
  - Create a client component (`CartLineControls.tsx`) that calls the server actions.
  - Create a server action that removes a product from the cart.
  - Add buttons to remove items.
  - Create a server action that changes the quantity of a product in the cart.
  - Add buttons to change quantity.
- Hints:
  - db.ts exports `removeFromCart` and `setCartItemQuantity`, to be used in the actions.
  - pass the item's id and quantity to `CartLineControls` as props.
  - Use `useTransition` and its `isPending` to disable buttons while updating. (prevents double clicks)
  - revalidate `"/cart"` after the server action updates the cart.
- Read more:
  - React transitions: `https://react.dev/reference/react/useTransition`
  - Next.js Server Actions: `https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations`

### Bonus: Optimistic UI for Cart updates (after Exercise 3)

- Where:
  - `/app/(shop)/cart/`
- Goal:
  - When updating the cart, show an immediate optimistic state (e.g. increment quantity, prices, etc.) before the server confirms.
- Steps:
  1. Extract the `items.map` rendering in `page.tsx` into a client component (`CartLines.tsx`).
  2. Create an `optimisticAction` function that uses the `useOptimistic` hook in the `CartLines.tsx` component to update the cart.
  3. Pass the `optimisticAction` function to the `CartLineControls` component, and run it before the action is triggered.
  4. Handle error by reverting the optimistic state.
- Hints:
  - Use `useOptimistic` to derive a temporary cart state. Keep `updateFn` pure and return new arrays/objects (no mutation).
  - Call `addOptimistic` before starting the server action (e.g. increment/decrement/remove). Derive totals from the optimistic state so prices/quantities stay consistent. On error, refetch or reset to the server cart.
- Test:
  - Click Add to Cart repeatedly. Ensure UI responds instantly and stays correct after the action resolves.
- Read more:
  - React useOptimistic hook: `https://react.dev/reference/react/useOptimistic`
  - Next.js Server Actions: `https://nextjs.org/docs/app/getting-started/updating-data`

---

### [Exercise 4] POST create product via API

- Where:
  - `/app/api/products/route.ts`
  - `/lib/db.ts`
  - `/app/(shop)/products/page.tsx`
- Goal:
  - Implement `POST /api/products` to add a product. After creating, revalidate the products list so `/products` shows the new item.
- Steps:
  - Implement the `POST` handler in `route.ts` to parse JSON and persist to your data store.
- Hints:
  - `db.ts` exports `createProduct`, to be used in the route handler.
  - Keep server code minimal and validate required fields.
- Test:
  - Create a product via cURL or Postman. Navigate to `/products` and confirm it appears without a manual refresh.
- Read more:
  - Route Handlers: `https://nextjs.org/docs/app/api-reference/file-conventions/route`
  - Caching and Revalidation: `https://nextjs.org/docs/app/guides/caching`

### Bonus: Admin create product form (after Exercise 4)

- Where:
  - Create `/app/(shop)/products/new/page.tsx`
- Goal:
  - A simple form that posts to `/api/products` and redirects back to `/products`.
  - Form includes name, price, category, and description.
- Hints:
  - Use the new route handler to create a product.
  - On success, redirect and show a lightweight confirmation.
- Read more:
  - Form submissions with Server Actions: `https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#form-submissions`

---

### [Exercise 5] Add a streamed section with Skeleton fallback

- Where:
  - `/app/page.tsx` (home) or `/products`
  - Use `/app/components/Skeleton.tsx`
- Goal:
  - Add a second, slower section (e.g. "Top Sellers" or "Trending") that streams in with a skeleton.
  - Add a server component `TopSellers.tsx` that fetches the top sellers.
- Hints:
  - Put slow data fetch in its own server component and wrap with `<Suspense>`.
  - `db.ts` exports `listProducts`, to be used in the server component.
  - use `slice(0, 3)` to simulate the top sellers.
  - simulate latency with `await sleep(800)` (import from `lib/db-helpers.ts`).
- Test:
  - Confirm the page renders instantly with placeholders, then content appears progressively.
- Read more:
  - Loading UI and Streaming: `https://nextjs.org/docs/app/api-reference/file-conventions/loading`

---

### [Exercise 6] Tag-based revalidation for cart

- Where:
  - `/app/(shop)/cart/page.tsx`
- Goal:
  - Wrap cart actions with unstable_cache to revalidate the cart page.
- Steps:
  1. Add tags to the list fetch so the page is cached under `cart`.
  2. On write operations (POST), call `revalidateTag('cart')`.
- Hints:
  - In exercise 4, we added a route to fetch the products. Update the actions that lists products to instead do a fetch with the tag `cart`.
  - Create a new cart action for reading the cart.
  - Use `unstable_cache` to wrap the cart read action. Example:
    ```tsx
    export const readCart = unstable_cache(readCartFromDisk, ["cart"], {
      tags: ["cart"],
    });
    ```
  - Update the cart page to use the `readCart` action.
  - Not deselecting "Disable cache" in the browser dev tools will make revalidateTag trigger on any tag. Make sure to deselect it when testing.
- Test:
  - Add or change cart items. Navigate back and ensure the list updates without a full hard reload.
- Read more:
  - Cache Tags: `https://nextjs.org/docs/app/api-reference/functions/revalidateTag`
  - unstable_cache: `https://nextjs.org/docs/app/api-reference/functions/unstable_cache`

---

### [Exercise 7] Tag-based revalidation for products list

- Where:
  - `/app/(shop)/products/`
- Goal:
  - Adding a new product should revalidate the products list.
- Hints:
  - If a page still shows stale content, ensure its fetch is tagged. `"products-list"`.
  - The product pages uses params, which marks the component as dynamic. This means it always fetches fresh data, and revalidatePath is a no-op. (use `npm run build` to check)
  - We can use unstable_cache to force caching of the products list, and use revalidateTag to revalidate it when a new product is created.
- Read more:
  - Dynamic Rendering: `https://nextjs.org/docs/app/getting-started/partial-prerendering#dynamic-rendering`
  - Cache Tags: `https://nextjs.org/docs/app/api-reference/functions/revalidateTag`
  - unstable_cache: `https://nextjs.org/docs/app/api-reference/functions/unstable_cache`

---

### Bonus: Replace anchor tags with Next.js Link

- Where:
  - Search in `/app/**` for `<a href="...">` that point to internal routes.
- Goal:
  - Replace internal anchor links with `next/link` to get client-side navigation and prefetching.
- Hints:
  - Import `Link` from `next/link` and replace `<a href="/path">` with `<Link href="/path">`.
  - Prefer absolute app routes (e.g. `"/products"`, `"/cart"`).
  - For loading strategies:
    - Default: `prefetch` is enabled in production for in-viewport links.
    - Disable prefetch for heavy pages: `<Link href="/big" prefetch={false}>`.
    - Dynamic routes should have a `loading.tsx`. (only the loading is prefetched, still makes routing faster)
    - One optimization could be to use a `HoverPrefetchLink` component that prefetches the link when the user hovers over it. See example below the `Disabling prefetching` section.
- Read more:
  - Next.js `Link` component: `https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component`
  - Prefetching behavior: `https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#prefetching`
  - Disabling prefetching: `https://nextjs.org/docs/app/getting-started/linking-and-navigating#disabling-prefetching`

### Bonus: Checkout page (clear cart via action, redirect to confirmation page)

- Where:
  - Create `/app/(shop)/checkout/page.tsx`
  - Create `/app/(shop)/checkout/confirmation/page.tsx`
  - Use `/app/(shop)/actions.ts`
- Goal:
  - Implement a minimal checkout that clears the cart via a server action and then redirects to a confirmation page.
- Hints:
  - Keep it simple: a single button that calls an action -> clears cart -> redirects.
- Read more:
  - Redirects in Server Actions: `https://nextjs.org/docs/app/guides/redirecting`

### Bonus: Quantity update cart nav link with optimistic UI

- Where:
  - In the site header (`/app/layout.tsx`)
- Goal:
  - Show cart item count in the nav and update it when adding/removing items.
- Hints:
  - Create a component (e.g. `CartNav.tsx`) that can react to cart changes.
  - Can be either a client component or a server component.
