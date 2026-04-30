"use client";

export function WineListSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-3">
      {/* Status Bar Skeleton */}
      <div className="relative flex h-6 shrink-0 items-center">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>

      {/* Slots Skeleton */}
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex h-[72px] items-center gap-3 rounded-lg border border-neutral-100 bg-white px-3 py-2"
          >
            {/* Wine Icon Skeleton */}
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-neutral-200" />
            
            {/* Content Skeleton */}
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="h-4 w-32 animate-pulse rounded bg-neutral-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
              </div>
              <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
            </div>

            {/* Actions Skeleton */}
            <div className="flex shrink-0 items-center gap-1">
              <div className="h-8 w-8 animate-pulse rounded bg-neutral-200" />
              <div className="h-8 w-8 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
