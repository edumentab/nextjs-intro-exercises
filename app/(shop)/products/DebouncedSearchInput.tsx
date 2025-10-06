"use client";

// [Bonus] Debounced search client component
// Hint: Debounce input and push `q` to searchParams using router.
// Docs: https://nextjs.org/docs/app/api-reference/functions/use-router
// Article on debouncing: https://medium.com/@ignatovich.dm/debouncing-and-throttling-in-react-whats-the-difference-and-how-to-implement-them-0a500b649235

import { useEffect, useState } from "react";

export default function DebouncedSearchInput({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="border px-2 py-1"
      placeholder="Search… (debounced)"
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        // debounced(newValue);
      }}
    />
  );
}
