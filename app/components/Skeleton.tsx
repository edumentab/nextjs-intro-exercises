// Simple skeleton used by Suspense fallbacks and loading.tsx
export function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-6 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}
