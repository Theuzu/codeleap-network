export function PostSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-[#CCCCCC] overflow-hidden bg-white animate-pulse">
      {/* Header */}
      <div className="bg-primary opacity-60 px-6 py-4 flex items-center justify-between h-14">
        <div className="h-4 w-48 bg-white opacity-30 rounded" />
      </div>

      {/* Body */}
      <div className="px-6 py-4 flex flex-col gap-3">
        {/* Username + timestamp */}
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-24 bg-gray-200 rounded" />
          <div className="h-3.5 w-20 bg-gray-200 rounded" />
        </div>

        {/* Content lines */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}