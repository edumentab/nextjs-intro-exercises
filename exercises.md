# Exercises

## Before you start

- Run the exercise app:
  - In a terminal: `npm install` and `npm run dev`
  - Open `http://localhost:4000`
- You will edit files in `/app`.
- After each change, test in the browser and try a quick refresh plus navigation.

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
- [Exercise 3: Removable cart lines and quantity update](#exercise-3-removable-cart-lines-and-quantity-update)
  - [Bonus: Optimistic UI for Add to Cart](#bonus-optimistic-ui-for-add-to-cart-after-exercise-3)
- [Exercise 4: Create product via API](#exercise-4-post-create-product-via-api-revalidate-products)
  - [Bonus: Admin create product form](#bonus-admin-create-product-form-after-exercise-4)
- [Exercise 5: Add a streamed section with Skeleton fallback](#exercise-5-add-a-streamed-section-with-skeleton-fallback)
- [Exercise 6: Tag-based revalidation for products list](#exercise-6-tag-based-revalidation-for-products-list)
  - [Bonus: Tag-based revalidation end-to-end](#bonus-tag-based-revalidation-end-to-end-after-exercise-6)
- [Bonus: Checkout page](#bonus-checkout-page-clear-cart-via-action-redirect-to-confirmation-page)
- [Bonus: Quantity update cart nav link with optimistic UI](#bonus-quantity-update-cart-nav-link-with-optimistic-ui)

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
  - Create `/app/(shop)/products/DebouncedSearchInput.tsx` (client component)
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
  - For now, use `listProducts()` to get all products, and filter them by category in the `RelatedProducts` component.
- Test:
  - Load a product page. Ensure primary details render first and related items pop in after.
- Read more:
  - Streaming and Suspense in Next.js: `https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming`

---

### [Exercise 3] Removable cart lines and quantity update

- Where:
  - `/app/(shop)/cart/`
- Goal:
  - Create a client component (`CartLineControls.tsx`) that calls the server action.
  - Create a server action that removes a product from the cart.
  - Add buttons to remove items with optimistic updates.
- Hints:
  - db.ts exports `removeFromCart` and `setCartItemQuantity`, to be used in the actions.
  - pass the item's id and quantity to `CartLineControls` as props.
  - Use `useTransition` for optimistic updates.
  - revalidate `"/cart"` after the server action updates the cart.
- Extra:
  - Optimistically adjust the list UI first, then call the server action.
  - Create a server action that changes the quantity of a product in the cart.
  - Add buttons to change quantity with optimistic updates.
- Read more:
  - React transitions: `https://react.dev/reference/react/useTransition`
  - Next.js Server Actions: `https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations`

### Bonus: Optimistic UI for Add to Cart (after Exercise 3)

- Where:
  - `/app/components/AddToCartForm.tsx`
  - `/app/(shop)/actions.ts` (server actions)
- Goal:
  - When adding to cart, show an immediate optimistic state (e.g. disable button, show "Added!" or increment quantity) before the server confirms.
- Steps:
  1. Create a server action that appends a product to the cart data store.
  2. In the form client component, use a transition or optimistic state to update UI immediately.
  3. Handle error by reverting the optimistic state.
- Hints:
  - Use `useTransition` for instant feedback.
  - Keep the optimistic state minimal: only the bits the user needs to see.
- Test:
  - Click Add to Cart repeatedly. Ensure UI responds instantly and stays correct after the action resolves.

---

### [Exercise 4] POST create product via API; revalidate /products

- Where:
  - `/app/api/products/route.ts`
  - `/lib/db.ts`
  - `/app/(shop)/products/page.tsx`
- Goal:
  - Implement `POST /api/products` to add a product. After creating, revalidate the products list so `/products` shows the new item.
- Steps:
  1. Add `POST` handler in `route.ts` to parse JSON and persist to your data store.
  2. Tag the products list fetch with a cache tag (e.g. `products`).
  3. Call `revalidatePath('/products')` after successful POST.
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

### [Exercise 6] Tag-based revalidation for products list

- Where:
  - `/app/(shop)/products/ProductsList.tsx`
  - `/app/api/products/route.ts`
- Goal:
  - Add fetch caching with `{ next: { tags: ['products'] } }`. Revalidate the tag when products change.
- Steps:
  1. Add tags to the list fetch so the page is cached under `products`.
  2. On write operations (POST), call `revalidateTag('products')`.
- Hints:
  - In exercise 4, we added a route to fetch the products. Update the actions that lists products to instead do a fetch with the tag `products`.
- Test:
  - Load `/products`. Create a product. Navigate back and ensure the list updates without a full hard reload.
- Read more:
  - Cache Tags: `https://nextjs.org/docs/app/api-reference/functions/revalidateTag`

### Bonus: Tag-based revalidation end-to-end (after Exercise 6)

- Where:
  - Everywhere `"products"` or `"cart"` is mentioned, ensure the fetch is tagged.
- Goal:
  - Verify that all flows (product and cart) that mutate products call the right revalidation.
- Hints:
  - If a page still shows stale content, ensure its fetch is tagged.
  - Remove all revalidatePath calls, and only use revalidateTag.

---

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
  - Data from the cart store or loader
- Goal:
  - Show cart item count in the nav and update it optimistically when adding/removing items.
- Hints:
  - Create a client component (e.g. `CartNav.tsx`) that can react to cart changes. Use transitions for smooth updates.
- Read more:
  - State and transitions: `https://react.dev/reference/react/useTransition`
